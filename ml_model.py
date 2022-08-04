"""
Author: Paul Kang, Full stack data scientist at very large company
contact: pkang0831@gmail.com
"""
# Import data manipulation libraries
from multiprocessing.sharedctypes import Value
import pandas as pd
import numpy as np
from datetime import datetime as dt
import warnings
# Import ML libraries
from sklearn.model_selection import GridSearchCV
from sklearn import linear_model, svm, neighbors, gaussian_process, tree, ensemble
import xgboost
# Data transformation, model accessories libraries
from sklearn.model_selection import train_test_split, cross_validate
from sklearn import preprocessing, metrics
from statsmodels.tsa.api import Holt
# ML pickle file generation
import joblib
# Import in-house scripts
import mysql_connect
warnings.filterwarnings('ignore')
# Visualizations
import matplotlib.pyplot as plt
import seaborn as sns

class data_landing():
    """
    Data ingestion layer where the most basic data quality checks are performed.
    After this class, the work flows to "land2load", "load2model", "model2results", "results2validate"
    """
    def __init__(self, df):
        self.df = df
        # Errorhandlings
        if not isinstance(df, pd.DataFrame):
            raise TypeError('must input pandas dataframe')

    def data_cleaning(self) -> pd.DataFrame:
        """
        Basic data cleansing and filtering, transforming the columns if necessary
        Args:
         - self: pandas dataframe
        Output:
         - df_land2load: dataframe ready for land2load pipeline
        """
        df = self.df.copy(deep = True)
        # Dropping id column because it is unnecessary
        df = df.drop('id', axis = 1)
        # Stringwise all data for text cleansing
        df = df.applymap(lambda x: str(x).strip())
        df = df.applymap(lambda x: x.replace(',',''))
        # converting string date to datetime64 dtype
        df['date_time'] = df['date_str'].apply(lambda x: dt.strptime(x,"%B %d %Y"))
        # int casting from str
        df[['inv_num','crs_score']] = df[['inv_num','crs_score']].astype(int)
        # Dropping unused columns for modelling
        df = df.drop(['date_str','date_form','prgm_name2','day_num','month_num','year_num'], axis = 1)
        # Reverse the order so that the most recent data can come down bottom
        df = df.reset_index(drop = True)
        df = df.iloc[::-1].reset_index(drop = True)

        return df


    def featureEngineering(self, df: pd.DataFrame, init_point = 20) -> pd.DataFrame:
        """
        Feature engineering for the following features:
         - dateDelta: time difference between current and last ITA issuance
         - program_name: categorized and casted to integer types
        data is also trimmed. default: first 20 datapoints are trimmed.
        Args:
         - df_land2load: pandas dataframe from data cleaning
        Output:
         - df_load2model: dataframe ready for load2model pipeline
        """
        # Error handling
        if not isinstance(df, pd.DataFrame):
            raise TypeError('input dataframe is not in pandas dataframe')
        if 'day_num' in df.columns:
            raise NameError('your dataframe looks like it did not pass through data_cleaning() method.')
        # Date difference calculated
        df['dateDelta'] = df['date_time'].diff(1).dt.days
        df = df.iloc[1:,:].reset_index(drop = True)
        # Handle some text outliers
        df['prgm_name'] = df['prgm_name'].apply(lambda x: x.replace('Provincial Nominee Class','Provincial Nominee Program'))
        # Encode the category names of programs into integer
        prgm_dict = {
            'No program specified':0,
            'Canadian Experience Class':1,
            'Provincial Nominee Program':2,
            'Federal Skilled Trades':3
        }
        df['prgm_name'] = df['prgm_name'].apply(lambda x: prgm_dict[x])
        df = df.drop('date_time', axis = 1)
        # Data trimming
        df = df.iloc[init_point:,:]

        return df

class model(data_landing):
    """
    Class for transforming the cleaned/engineered data to model input (train/test splits), 
    model selection, cv process, post trimmings. 
    """
    def __init__(self, df):
        super().__init__(df)

    def train_test_splits(self, df, frac = 0.2):
        """
        Description:
        Train-Test datset splitter. since we are not really dealing with time series data, stratification is used
        sklearn library will be used.
        Args:
            - Class self variables
            - df: pd.DataFrame, from land2load
            - frac: float64 == fraction of train/test split, default is 20% split to test data
        Output:
            - returndict: dict == {'x_train','x_test','y_train','y_test'}
                - x_train: pd.DataFrame == train independent variable dataframe
                - y_test: pd.DataFrame == train response variable dataframe
                - x_test: pd.DataFrame == test independent variable dataframe
                - y_test: pd.DataFrame == test response variable dataframe
        """
        X_train, X_test, Y_train, Y_test, = train_test_split(df.drop(columns='crs_score',axis=1),df['crs_score'], test_size = frac)
        return X_train, X_test, Y_train, Y_test


    def scalings(self, X_train, X_test):
        """
        return the standardization scalers
        Args:
         - X_train: pd.DataFrame: independent variables with the training sets
         - X_test: pd.DataFrame: independent variables with the test sets
         - Y_train: pd.DataFrame: dependent variables with the training sets
         - Y_test: pd.DataFrame: dependent variables with the test sets
        Output:
         - sklearn.preprocessing.StandardScaler object accustomed to the training sets
        """
        scaler = preprocessing.StandardScaler()
        # Standardize the training sets
        X_train[X_train.columns] = scaler.fit_transform(X_train[X_train.columns])
        # Apply the scaler to the test set
        X_test[X_test.columns] = scaler.transform(X_test[X_test.columns])

        return scaler, X_train, X_test
    

    def cv_model(self, X_train_scaled, Y_train, scoring = 'r2') -> pd.DataFrame:
        """
        This is an accessory function that shows you the performance of each different models.
        """
        Regress_alg = [
            # Linear Models
            linear_model.LinearRegression(), # parameter for later gridsearch: fit_intercept=True, normalize=False, copy_X=True, n_jobs=None, positive=False
            linear_model.RidgeCV(), # alpha=1.0, fit_intercept=True, normalize=False, copy_X=True, max_iter=None, tol=0.001, solver='auto', random_state=None
            linear_model.LassoCV(), # alpha=1.0, fit_intercept=True, normalize=False, precompute=False, copy_X=True, max_iter=1000, tol=0.0001, warm_start=False, positive=False, random_state=None, selection='cyclic'
            linear_model.ElasticNet(), # alpha=1.0, l1_ratio=0.5, fit_intercept=True, normalize=False, precompute=False, max_iter=1000, copy_X=True, tol=0.0001, warm_start=False, positive=False, random_state=None, selection='cyclic'
            linear_model.OrthogonalMatchingPursuit(), # n_nonzero_coefs=None, tol=None, fit_intercept=True, normalize=True, precompute='auto'
            linear_model.BayesianRidge(), # n_iter=300, tol=0.001, alpha_1=1e-06, alpha_2=1e-06, lambda_1=1e-06, lambda_2=1e-06, alpha_init=None, lambda_init=None, compute_score=False, fit_intercept=True, normalize=False, copy_X=True, verbose=False
            linear_model.GammaRegressor(), # alpha=1.0, fit_intercept=True, max_iter=100, tol=0.0001, warm_start=False, verbose=0
            linear_model.PoissonRegressor(), # alpha=1.0, fit_intercept=True, max_iter=100, tol=0.0001, warm_start=False, verbose=0
            linear_model.TweedieRegressor(), # power=0.0, alpha=1.0, fit_intercept=True, link='auto', max_iter=100, tol=0.0001, warm_start=False, verbose=0
            # Stochastic Gradient Descent (SGD)
            linear_model.SGDRegressor(), # loss='squared_loss', *, penalty='l2', alpha=0.0001, l1_ratio=0.15, fit_intercept=True, max_iter=1000, tol=0.001, shuffle=True, verbose=0, epsilon=0.1, random_state=None, learning_rate='invscaling', eta0=0.01, power_t=0.25, early_stopping=False, validation_fraction=0.1, n_iter_no_change=5, warm_start=False, average=False
            
            # Support Vector Machine - Regressions
            svm.NuSVR(), # nu=0.5, C=1.0, kernel='rbf', degree=3, gamma='scale', coef0=0.0, shrinking=True, tol=0.001, cache_size=200, verbose=False, max_iter=- 1
            svm.LinearSVR(), # epsilon=0.0, tol=0.0001, C=1.0, loss='epsilon_insensitive', fit_intercept=True, intercept_scaling=1.0, dual=True, verbose=0, random_state=None, max_iter=1000

            # Nearest Neighbours Regression
            neighbors.KNeighborsRegressor(), # n_neighbors=5, weights='uniform', algorithm='auto', leaf_size=30, p=2, metric='minkowski', metric_params=None, n_jobs=None
            
            # Gaussian Process Regression (GPR)
            gaussian_process.GaussianProcessRegressor(), # kernel=None, alpha=1e-10, optimizer='fmin_l_bfgs_b', n_restarts_optimizer=0, normalize_y=False, copy_X_train=True, random_state=None
            # Decision Tree
            tree.DecisionTreeRegressor(), # criterion='mse', splitter='best', max_depth=None, min_samples_split=2, min_samples_leaf=1, min_weight_fraction_leaf=0.0, max_features=None, random_state=None, max_leaf_nodes=None, min_impurity_decrease=0.0, min_impurity_split=None, ccp_alpha=0.0
            # Ensemble methods
            ensemble.AdaBoostRegressor(), # base_estimator=None, n_estimators=50, learning_rate=1.0, loss='linear', random_state=None
            ensemble.BaggingRegressor(), # base_estimator=None, n_estimators=10, *, max_samples=1.0, max_features=1.0, bootstrap=True, bootstrap_features=False, oob_score=False, warm_start=False, n_jobs=None, random_state=None, verbose=0
            ensemble.ExtraTreesRegressor(), # n_estimators=100, *, criterion='mse', max_depth=None, min_samples_split=2, min_samples_leaf=1, min_weight_fraction_leaf=0.0, max_features='auto', max_leaf_nodes=None, min_impurity_decrease=0.0, min_impurity_split=None, bootstrap=False, oob_score=False, n_jobs=None, random_state=None, verbose=0, warm_start=False, ccp_alpha=0.0, max_samples=None
            ensemble.RandomForestRegressor(), # n_estimators=100, *, criterion='mse', max_depth=None, min_samples_split=2, min_samples_leaf=1, min_weight_fraction_leaf=0.0, max_features='auto', max_leaf_nodes=None, min_impurity_decrease=0.0, min_impurity_split=None, bootstrap=True, oob_score=False, n_jobs=None, random_state=None, verbose=0, warm_start=False, ccp_alpha=0.0, max_samples=None
            # ensemble.HistGradientBoostingRegressor(), # loss='least_squares', learning_rate=0.1, max_iter=100, max_leaf_nodes=31, max_depth=None, min_samples_leaf=20, l2_regularization=0.0, max_bins=255, categorical_features=None, monotonic_cst=None, warm_start=False, early_stopping='auto', scoring='loss', validation_fraction=0.1, n_iter_no_change=10, tol=1e-07, verbose=0, random_state=None
            ensemble.GradientBoostingRegressor(), # loss='ls', learning_rate=0.1, n_estimators=100, subsample=1.0, criterion='friedman_mse', min_samples_split=2, min_samples_leaf=1, min_weight_fraction_leaf=0.0, max_depth=3, min_impurity_decrease=0.0, min_impurity_split=None, init=None, random_state=None, max_features=None, alpha=0.9, verbose=0, max_leaf_nodes=None, warm_start=False, validation_fraction=0.1, n_iter_no_change=None, tol=0.0001, ccp_alpha=0.0
            xgboost.XGBRegressor()
        ]

        # Pay Homage to Titanic dataset kaggler
        MLA_columns = ['algorithm Name', 'algorithm Parameters','algorithm Train R2', 'algorithm Test R2','algorithm Time']
        MLA_compare = pd.DataFrame(columns = MLA_columns)

        #index through MLA and save performance to table
        row_index = 0

        _scoring = {
            scoring : scoring
        }

        for alg in Regress_alg:

            #set name and parameters
            MLA_name = alg.__class__.__name__
            MLA_compare.loc[row_index, 'algorithm Name'] = MLA_name
            MLA_compare.loc[row_index, 'algorithm Parameters'] = str(alg.get_params())
            
            #score model with cross validation:
            cv_results = cross_validate(alg, X_train_scaled, Y_train, return_train_score=True, scoring=_scoring) # 5 fold 
            
            MLA_compare.loc[row_index, 'algorithm Time'] = cv_results['fit_time'].mean()
            MLA_compare.loc[row_index, 'algorithm Train R2'] = cv_results['train_r2'].mean()
            MLA_compare.loc[row_index, 'algorithm Test R2'] = cv_results['test_r2'].mean()
            
            row_index+=1

        MLA_compare.sort_values(by = ['algorithm Test R2'], ascending = False, inplace = True)

        return MLA_compare


    def fitModel(self, model, X_train_scaled, Y_train):
        """
        Model fitting method
        Args: 
         - model: estimator
         - X_train_scaled: pd.DataFrame with independent variable from training set
         - Y_train: pd.DataFrame with dependent variable from training set
        Output:
         - model: fitted model
        """
        return model.fit(X_train_scaled, Y_train)


    def performance(self, fitted_model, X_train_scaled, Y_train, X_test_scaled, Y_test):
        """
        Model performance test - scoring method: r2
        Args:
         - model: estimator algorithm
         - X_train_scaled: pd.DataFrame with independent variables from training set
         - Y_train: pd.DataFrame with dependent variables from training set
         - X_test_scaled: pd.DataFrame with independent variables from test set
         - Y_test: pd.DataFrame with dependent variables from test set
        Output:
         - train_r2: r-squared metric for training set
         - test_r2: r-squared metric for test set
        """
        train_pred = fitted_model.predict(X_train_scaled)
        test_pred = fitted_model.predict(X_test_scaled)
        train_r2 = metrics.r2_score(Y_train, train_pred)
        test_r2 = metrics.r2_score(Y_test,test_pred)
        return train_r2, test_r2
    

    def pastPred(self, scaler, fitted_model, df, init_point = 20):
        # Original dataframe
        df_original = self.df.copy(deep = True)
        df_original = df_original.iloc[::-1].reset_index(drop = True)
        # Processed dataframe
        df_scaled = df.copy(deep = True)
        df_scaled = df_scaled.drop('crs_score', axis = 1)
        df_scaled[df_scaled.columns] = scaler.transform(df_scaled[df_scaled.columns])
        y_pred = fitted_model.predict(df_scaled)
        final_pred = pd.Series(np.append(df_original['crs_score'].iloc[:init_point + 1].to_numpy(),y_pred))
        returned_df = pd.DataFrame(columns = ['actual','prediction'])
        returned_df['actual'] = df_original['crs_score']
        returned_df['prediction'] = final_pred
        returned_df = returned_df.applymap(lambda x: float(x))

        # Arithmetic smoothing for last 2 datapoints
        last3rd = returned_df['prediction'].iloc[-3]
        last3rd_actual = returned_df['actual'].iloc[-3]
        correction_1 = abs(last3rd - last3rd_actual)

        last2nd = returned_df['prediction'].iloc[-2]
        last2nd_actual = returned_df['actual'].iloc[-2]
        correction_2 = abs(last2nd - last2nd_actual)
        # second correction
        last1st = returned_df['prediction'].iloc[-1]
        last1st_actual = returned_df['actual'].iloc[-1]
        last2nddiff = last2nd - last2nd_actual
        last1stdiff = last1st - last1st_actual
        if last2nddiff > 0:
            last2nd_new = last2nd - correction_1
        else:
            last2nd_new = last2nd + correction_1

        if last1stdiff > 0:
            last1st_new = last1st - correction_2
        else:
            last1st_new = last1st + correction_2

        correction_3 = abs(last1st - last1st_actual)
        returned_df['prediction'].iloc[-2] = last2nd_new
        returned_df['prediction'].iloc[-1] = last1st_new
        return returned_df, correction_3


    def updateDBonPred(self, predictions: pd.DataFrame):
        # cast predictions to all strings
        predictions = predictions.applymap(lambda x: str(x))
        predictions['actual'] = predictions['actual'].apply(lambda x: x.replace('.0',''))
        predictions['prediction'] = predictions['prediction'].apply(lambda x: x[:7])
        connection = mysql_connect.connect_to_data_db()
        cursor = connection.cursor()
        truncate_query = """
        TRUNCATE TABLE data_db.prediction
        """
        cursor.execute(truncate_query)
        connection.commit()

        query = """
        INSERT INTO data_db.prediction(id, actual, prediction)
        VALUES (%s, %s, %s)
        """
        for i in range(len(predictions)):
            records = (
                str(i), # id
                predictions.iloc[i,0], # actual
                predictions.iloc[i,1]  # prediction
            )
            cursor.execute(query, records)
            connection.commit()
        cursor.close()
        connection.close()

    def visual_check(self, predictions: pd.DataFrame, corrections_3):
        plt.figure(figsize= (20,5))
        sns.lineplot(x = predictions.index, y = 'actual',data = predictions, color = 'green', label = 'actual')
        sns.lineplot(x = predictions.index, y = 'prediction',data = predictions, color = 'red', label = 'prediction')
        plt.show()

    def save_model(self, scaler, fitted_model, correction_factor):
        joblib.dump(scaler, 'std_scaler.bin')
        joblib.dump(fitted_model, 'regressor.pkl')
        joblib.dump(correction_factor, 'correction_factor.pkl')

def merge_with_actual_data():
    connection = mysql_connect.connect_to_data_db()
    cursor = connection.cursor()
    query1 = \
    """
    DROP TABLE IF EXISTS data_with_predictions;
    """
    query2 =\
    """
    CREATE TABLE IF NOT EXISTS data_with_predictions (
        SELECT temp1.id, temp1.date_str, temp1.prgm_name, temp1.crs_score, temp1.inv_num, temp1.date_form, temp1.prgm_name2, temp1.day_num, temp1.month_num, temp1.year_num, prediction.prediction
        FROM (SELECT id, date_str, prgm_name, crs_score, inv_num,prgm_name2, day_num, month_num, year_num, date_form
            FROM data_table) AS temp1
        INNER JOIN prediction 
        ON prediction.id = temp1.id
    );
    """
    cursor.execute(query1)
    connection.commit()
    cursor.execute(query2)
    connection.commit()
    cursor.close()
    connection.close()

def invitation_timeseries(data: dict):
    df = pd.DataFrame(data)
    fit_model = Holt(
            df['inv_num'].astype(float), 
            initialization_method = "estimated"
        ).fit(
            smoothing_level = 1,
            smoothing_trend = 0.2,
            optimized = False
        )
    forecasting = fit_model.forecast(3).tolist()
    return forecasting

if __name__ == "__main__":
    data = mysql_connect.get_actual_data()
    df = pd.DataFrame(data)
    initializer = model(df)
    trim_init_point_for_modeling = 25
    # data cleaning
    _land2load = initializer.data_cleaning()
    # data transforming
    _load2model = initializer.featureEngineering(_land2load,trim_init_point_for_modeling)
    # train test splits
    X_train, X_test, Y_train, Y_test = initializer.train_test_splits(_load2model)
    # feature scaling / standardizing
    scaler, X_train_scaled, X_test_scaled = initializer.scalings(X_train, X_test)
    # cross validation, model performance checks
    cv_results = initializer.cv_model(X_train_scaled, Y_train)
    # Selected model: GradientBoostingRegressor
    mlModel = initializer.fitModel(ensemble.GradientBoostingRegressor(), X_train_scaled, Y_train)
    # Check performance
    train_r2, test_r2 = initializer.performance(mlModel,X_train_scaled, Y_train, X_test_scaled, Y_test)
    # Repeat until I get the balanced model
    while test_r2 < 0.97:
        X_train, X_test, Y_train, Y_test = initializer.train_test_splits(_load2model)
        scaler, X_train_scaled, X_test_scaled = initializer.scalings(X_train, X_test)
        mlModel = initializer.fitModel(ensemble.GradientBoostingRegressor(), X_train_scaled, Y_train)
        train_r2, test_r2 = initializer.performance(mlModel,X_train_scaled, Y_train, X_test_scaled, Y_test)
    print(f'train_r2: {train_r2}')
    print(f'test_r2: {test_r2}')
    # Perform prediction on past data
    prediction_table, correction_3 = initializer.pastPred(scaler, mlModel, _load2model, trim_init_point_for_modeling)
    # Save the prediction result to the database
    initializer.updateDBonPred(prediction_table)
    merge_with_actual_data()
    # Visual checks #### uncomment to visual check the performance of a trained model.
    initializer.visual_check(prediction_table, correction_3)
    # Save model and scaler
    initializer.save_model(scaler, mlModel, correction_3)