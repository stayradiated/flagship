export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  timestamp: { input: string; output: string; }
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']['input']>;
  _gt?: InputMaybe<Scalars['Boolean']['input']>;
  _gte?: InputMaybe<Scalars['Boolean']['input']>;
  _in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Boolean']['input']>;
  _lte?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Scalars['Boolean']['input']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']['input']>;
  _gt?: InputMaybe<Scalars['Int']['input']>;
  _gte?: InputMaybe<Scalars['Int']['input']>;
  _in?: InputMaybe<Array<Scalars['Int']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Int']['input']>;
  _lte?: InputMaybe<Scalars['Int']['input']>;
  _neq?: InputMaybe<Scalars['Int']['input']>;
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "accounts" */
export type Accounts = {
  __typename?: 'accounts';
  account_type: Scalars['String']['output'];
  /** An array relationship */
  accounts: Array<Accounts>;
  /** An aggregate relationship */
  accounts_aggregate: Accounts_Aggregate;
  /** An object relationship */
  alternative_account?: Maybe<Accounts>;
  created_at: Scalars['timestamp']['output'];
  /** An array relationship */
  features_accounts: Array<Features_Accounts>;
  /** An aggregate relationship */
  features_accounts_aggregate: Features_Accounts_Aggregate;
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  size?: Maybe<Scalars['String']['output']>;
  updated_at: Scalars['timestamp']['output'];
};


/** columns and relationships of "accounts" */
export type AccountsAccountsArgs = {
  distinct_on?: InputMaybe<Array<Accounts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Accounts_Order_By>>;
  where?: InputMaybe<Accounts_Bool_Exp>;
};


/** columns and relationships of "accounts" */
export type AccountsAccounts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Accounts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Accounts_Order_By>>;
  where?: InputMaybe<Accounts_Bool_Exp>;
};


/** columns and relationships of "accounts" */
export type AccountsFeatures_AccountsArgs = {
  distinct_on?: InputMaybe<Array<Features_Accounts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Features_Accounts_Order_By>>;
  where?: InputMaybe<Features_Accounts_Bool_Exp>;
};


/** columns and relationships of "accounts" */
export type AccountsFeatures_Accounts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Features_Accounts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Features_Accounts_Order_By>>;
  where?: InputMaybe<Features_Accounts_Bool_Exp>;
};

/** aggregated selection of "accounts" */
export type Accounts_Aggregate = {
  __typename?: 'accounts_aggregate';
  aggregate?: Maybe<Accounts_Aggregate_Fields>;
  nodes: Array<Accounts>;
};

export type Accounts_Aggregate_Bool_Exp = {
  count?: InputMaybe<Accounts_Aggregate_Bool_Exp_Count>;
};

export type Accounts_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Accounts_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Accounts_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "accounts" */
export type Accounts_Aggregate_Fields = {
  __typename?: 'accounts_aggregate_fields';
  avg?: Maybe<Accounts_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Accounts_Max_Fields>;
  min?: Maybe<Accounts_Min_Fields>;
  stddev?: Maybe<Accounts_Stddev_Fields>;
  stddev_pop?: Maybe<Accounts_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Accounts_Stddev_Samp_Fields>;
  sum?: Maybe<Accounts_Sum_Fields>;
  var_pop?: Maybe<Accounts_Var_Pop_Fields>;
  var_samp?: Maybe<Accounts_Var_Samp_Fields>;
  variance?: Maybe<Accounts_Variance_Fields>;
};


/** aggregate fields of "accounts" */
export type Accounts_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Accounts_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "accounts" */
export type Accounts_Aggregate_Order_By = {
  avg?: InputMaybe<Accounts_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Accounts_Max_Order_By>;
  min?: InputMaybe<Accounts_Min_Order_By>;
  stddev?: InputMaybe<Accounts_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Accounts_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Accounts_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Accounts_Sum_Order_By>;
  var_pop?: InputMaybe<Accounts_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Accounts_Var_Samp_Order_By>;
  variance?: InputMaybe<Accounts_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Accounts_Avg_Fields = {
  __typename?: 'accounts_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "accounts" */
export type Accounts_Avg_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "accounts". All fields are combined with a logical 'AND'. */
export type Accounts_Bool_Exp = {
  _and?: InputMaybe<Array<Accounts_Bool_Exp>>;
  _not?: InputMaybe<Accounts_Bool_Exp>;
  _or?: InputMaybe<Array<Accounts_Bool_Exp>>;
  account_type?: InputMaybe<String_Comparison_Exp>;
  accounts?: InputMaybe<Accounts_Bool_Exp>;
  accounts_aggregate?: InputMaybe<Accounts_Aggregate_Bool_Exp>;
  alternative_account?: InputMaybe<Accounts_Bool_Exp>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  features_accounts?: InputMaybe<Features_Accounts_Bool_Exp>;
  features_accounts_aggregate?: InputMaybe<Features_Accounts_Aggregate_Bool_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  size?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
};

/** aggregate max on columns */
export type Accounts_Max_Fields = {
  __typename?: 'accounts_max_fields';
  account_type?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  size?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** order by max() on columns of table "accounts" */
export type Accounts_Max_Order_By = {
  account_type?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Accounts_Min_Fields = {
  __typename?: 'accounts_min_fields';
  account_type?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  size?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** order by min() on columns of table "accounts" */
export type Accounts_Min_Order_By = {
  account_type?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "accounts". */
export type Accounts_Order_By = {
  account_type?: InputMaybe<Order_By>;
  accounts_aggregate?: InputMaybe<Accounts_Aggregate_Order_By>;
  alternative_account?: InputMaybe<Accounts_Order_By>;
  created_at?: InputMaybe<Order_By>;
  features_accounts_aggregate?: InputMaybe<Features_Accounts_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** select columns of table "accounts" */
export enum Accounts_Select_Column {
  /** column name */
  AccountType = 'account_type',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Size = 'size',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate stddev on columns */
export type Accounts_Stddev_Fields = {
  __typename?: 'accounts_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "accounts" */
export type Accounts_Stddev_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Accounts_Stddev_Pop_Fields = {
  __typename?: 'accounts_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "accounts" */
export type Accounts_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Accounts_Stddev_Samp_Fields = {
  __typename?: 'accounts_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "accounts" */
export type Accounts_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "accounts" */
export type Accounts_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Accounts_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Accounts_Stream_Cursor_Value_Input = {
  account_type?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate sum on columns */
export type Accounts_Sum_Fields = {
  __typename?: 'accounts_sum_fields';
  id?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "accounts" */
export type Accounts_Sum_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Accounts_Var_Pop_Fields = {
  __typename?: 'accounts_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "accounts" */
export type Accounts_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Accounts_Var_Samp_Fields = {
  __typename?: 'accounts_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "accounts" */
export type Accounts_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Accounts_Variance_Fields = {
  __typename?: 'accounts_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "accounts" */
export type Accounts_Variance_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** columns and relationships of "features" */
export type Features = {
  __typename?: 'features';
  created_at: Scalars['timestamp']['output'];
  description?: Maybe<Scalars['String']['output']>;
  enabled: Scalars['Boolean']['output'];
  /** An array relationship */
  features_accounts: Array<Features_Accounts>;
  /** An aggregate relationship */
  features_accounts_aggregate: Features_Accounts_Aggregate;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  updated_at: Scalars['timestamp']['output'];
};


/** columns and relationships of "features" */
export type FeaturesFeatures_AccountsArgs = {
  distinct_on?: InputMaybe<Array<Features_Accounts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Features_Accounts_Order_By>>;
  where?: InputMaybe<Features_Accounts_Bool_Exp>;
};


/** columns and relationships of "features" */
export type FeaturesFeatures_Accounts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Features_Accounts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Features_Accounts_Order_By>>;
  where?: InputMaybe<Features_Accounts_Bool_Exp>;
};

/** columns and relationships of "features_accounts" */
export type Features_Accounts = {
  __typename?: 'features_accounts';
  /** An object relationship */
  account: Accounts;
  account_id: Scalars['Int']['output'];
  created_at: Scalars['timestamp']['output'];
  enabled: Scalars['Boolean']['output'];
  /** An object relationship */
  feature: Features;
  feature_id: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  updated_at: Scalars['timestamp']['output'];
};

/** aggregated selection of "features_accounts" */
export type Features_Accounts_Aggregate = {
  __typename?: 'features_accounts_aggregate';
  aggregate?: Maybe<Features_Accounts_Aggregate_Fields>;
  nodes: Array<Features_Accounts>;
};

export type Features_Accounts_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Features_Accounts_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Features_Accounts_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Features_Accounts_Aggregate_Bool_Exp_Count>;
};

export type Features_Accounts_Aggregate_Bool_Exp_Bool_And = {
  arguments: Features_Accounts_Select_Column_Features_Accounts_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Features_Accounts_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Features_Accounts_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Features_Accounts_Select_Column_Features_Accounts_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Features_Accounts_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Features_Accounts_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Features_Accounts_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Features_Accounts_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "features_accounts" */
export type Features_Accounts_Aggregate_Fields = {
  __typename?: 'features_accounts_aggregate_fields';
  avg?: Maybe<Features_Accounts_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Features_Accounts_Max_Fields>;
  min?: Maybe<Features_Accounts_Min_Fields>;
  stddev?: Maybe<Features_Accounts_Stddev_Fields>;
  stddev_pop?: Maybe<Features_Accounts_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Features_Accounts_Stddev_Samp_Fields>;
  sum?: Maybe<Features_Accounts_Sum_Fields>;
  var_pop?: Maybe<Features_Accounts_Var_Pop_Fields>;
  var_samp?: Maybe<Features_Accounts_Var_Samp_Fields>;
  variance?: Maybe<Features_Accounts_Variance_Fields>;
};


/** aggregate fields of "features_accounts" */
export type Features_Accounts_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Features_Accounts_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "features_accounts" */
export type Features_Accounts_Aggregate_Order_By = {
  avg?: InputMaybe<Features_Accounts_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Features_Accounts_Max_Order_By>;
  min?: InputMaybe<Features_Accounts_Min_Order_By>;
  stddev?: InputMaybe<Features_Accounts_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Features_Accounts_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Features_Accounts_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Features_Accounts_Sum_Order_By>;
  var_pop?: InputMaybe<Features_Accounts_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Features_Accounts_Var_Samp_Order_By>;
  variance?: InputMaybe<Features_Accounts_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Features_Accounts_Avg_Fields = {
  __typename?: 'features_accounts_avg_fields';
  account_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "features_accounts" */
export type Features_Accounts_Avg_Order_By = {
  account_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "features_accounts". All fields are combined with a logical 'AND'. */
export type Features_Accounts_Bool_Exp = {
  _and?: InputMaybe<Array<Features_Accounts_Bool_Exp>>;
  _not?: InputMaybe<Features_Accounts_Bool_Exp>;
  _or?: InputMaybe<Array<Features_Accounts_Bool_Exp>>;
  account?: InputMaybe<Accounts_Bool_Exp>;
  account_id?: InputMaybe<Int_Comparison_Exp>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  enabled?: InputMaybe<Boolean_Comparison_Exp>;
  feature?: InputMaybe<Features_Bool_Exp>;
  feature_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
};

/** unique or primary key constraints on table "features_accounts" */
export enum Features_Accounts_Constraint {
  /** unique or primary key constraint on columns "id" */
  FeaturesAccountsPkey = 'features_accounts_pkey',
  /** unique or primary key constraint on columns "account_id", "feature_id" */
  IndexFeaturesAccountsOnAccountIdAndFeatureId = 'index_features_accounts_on_account_id_and_feature_id',
  /** unique or primary key constraint on columns "account_id", "id" */
  IndexUniqueFeaturesAccountsIdAccountId = 'index_unique_features_accounts_id_account_id'
}

/** input type for incrementing numeric columns in table "features_accounts" */
export type Features_Accounts_Inc_Input = {
  account_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "features_accounts" */
export type Features_Accounts_Insert_Input = {
  account_id?: InputMaybe<Scalars['Int']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  feature_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate max on columns */
export type Features_Accounts_Max_Fields = {
  __typename?: 'features_accounts_max_fields';
  account_id?: Maybe<Scalars['Int']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  feature_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** order by max() on columns of table "features_accounts" */
export type Features_Accounts_Max_Order_By = {
  account_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  feature_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Features_Accounts_Min_Fields = {
  __typename?: 'features_accounts_min_fields';
  account_id?: Maybe<Scalars['Int']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  feature_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** order by min() on columns of table "features_accounts" */
export type Features_Accounts_Min_Order_By = {
  account_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  feature_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "features_accounts" */
export type Features_Accounts_Mutation_Response = {
  __typename?: 'features_accounts_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Features_Accounts>;
};

/** on_conflict condition type for table "features_accounts" */
export type Features_Accounts_On_Conflict = {
  constraint: Features_Accounts_Constraint;
  update_columns?: Array<Features_Accounts_Update_Column>;
  where?: InputMaybe<Features_Accounts_Bool_Exp>;
};

/** Ordering options when selecting data from "features_accounts". */
export type Features_Accounts_Order_By = {
  account?: InputMaybe<Accounts_Order_By>;
  account_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  enabled?: InputMaybe<Order_By>;
  feature?: InputMaybe<Features_Order_By>;
  feature_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: features_accounts */
export type Features_Accounts_Pk_Columns_Input = {
  id: Scalars['Int']['input'];
};

/** select columns of table "features_accounts" */
export enum Features_Accounts_Select_Column {
  /** column name */
  AccountId = 'account_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Enabled = 'enabled',
  /** column name */
  FeatureId = 'feature_id',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** select "features_accounts_aggregate_bool_exp_bool_and_arguments_columns" columns of table "features_accounts" */
export enum Features_Accounts_Select_Column_Features_Accounts_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  Enabled = 'enabled'
}

/** select "features_accounts_aggregate_bool_exp_bool_or_arguments_columns" columns of table "features_accounts" */
export enum Features_Accounts_Select_Column_Features_Accounts_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  Enabled = 'enabled'
}

/** input type for updating data in table "features_accounts" */
export type Features_Accounts_Set_Input = {
  account_id?: InputMaybe<Scalars['Int']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  feature_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate stddev on columns */
export type Features_Accounts_Stddev_Fields = {
  __typename?: 'features_accounts_stddev_fields';
  account_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "features_accounts" */
export type Features_Accounts_Stddev_Order_By = {
  account_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Features_Accounts_Stddev_Pop_Fields = {
  __typename?: 'features_accounts_stddev_pop_fields';
  account_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "features_accounts" */
export type Features_Accounts_Stddev_Pop_Order_By = {
  account_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Features_Accounts_Stddev_Samp_Fields = {
  __typename?: 'features_accounts_stddev_samp_fields';
  account_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "features_accounts" */
export type Features_Accounts_Stddev_Samp_Order_By = {
  account_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "features_accounts" */
export type Features_Accounts_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Features_Accounts_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Features_Accounts_Stream_Cursor_Value_Input = {
  account_id?: InputMaybe<Scalars['Int']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  feature_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate sum on columns */
export type Features_Accounts_Sum_Fields = {
  __typename?: 'features_accounts_sum_fields';
  account_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "features_accounts" */
export type Features_Accounts_Sum_Order_By = {
  account_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** update columns of table "features_accounts" */
export enum Features_Accounts_Update_Column {
  /** column name */
  AccountId = 'account_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Enabled = 'enabled',
  /** column name */
  FeatureId = 'feature_id',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Features_Accounts_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Features_Accounts_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Features_Accounts_Set_Input>;
  /** filter the rows which have to be updated */
  where: Features_Accounts_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Features_Accounts_Var_Pop_Fields = {
  __typename?: 'features_accounts_var_pop_fields';
  account_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "features_accounts" */
export type Features_Accounts_Var_Pop_Order_By = {
  account_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Features_Accounts_Var_Samp_Fields = {
  __typename?: 'features_accounts_var_samp_fields';
  account_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "features_accounts" */
export type Features_Accounts_Var_Samp_Order_By = {
  account_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Features_Accounts_Variance_Fields = {
  __typename?: 'features_accounts_variance_fields';
  account_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "features_accounts" */
export type Features_Accounts_Variance_Order_By = {
  account_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregated selection of "features" */
export type Features_Aggregate = {
  __typename?: 'features_aggregate';
  aggregate?: Maybe<Features_Aggregate_Fields>;
  nodes: Array<Features>;
};

/** aggregate fields of "features" */
export type Features_Aggregate_Fields = {
  __typename?: 'features_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Features_Max_Fields>;
  min?: Maybe<Features_Min_Fields>;
};


/** aggregate fields of "features" */
export type Features_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Features_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "features". All fields are combined with a logical 'AND'. */
export type Features_Bool_Exp = {
  _and?: InputMaybe<Array<Features_Bool_Exp>>;
  _not?: InputMaybe<Features_Bool_Exp>;
  _or?: InputMaybe<Array<Features_Bool_Exp>>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  enabled?: InputMaybe<Boolean_Comparison_Exp>;
  features_accounts?: InputMaybe<Features_Accounts_Bool_Exp>;
  features_accounts_aggregate?: InputMaybe<Features_Accounts_Aggregate_Bool_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
};

/** aggregate max on columns */
export type Features_Max_Fields = {
  __typename?: 'features_max_fields';
  created_at?: Maybe<Scalars['timestamp']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** aggregate min on columns */
export type Features_Min_Fields = {
  __typename?: 'features_min_fields';
  created_at?: Maybe<Scalars['timestamp']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** Ordering options when selecting data from "features". */
export type Features_Order_By = {
  created_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  enabled?: InputMaybe<Order_By>;
  features_accounts_aggregate?: InputMaybe<Features_Accounts_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** select columns of table "features" */
export enum Features_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  Enabled = 'enabled',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** Streaming cursor of the table "features" */
export type Features_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Features_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Features_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "features_accounts" */
  delete_features_accounts?: Maybe<Features_Accounts_Mutation_Response>;
  /** delete single row from the table: "features_accounts" */
  delete_features_accounts_by_pk?: Maybe<Features_Accounts>;
  /** insert data into the table: "features_accounts" */
  insert_features_accounts?: Maybe<Features_Accounts_Mutation_Response>;
  /** insert a single row into the table: "features_accounts" */
  insert_features_accounts_one?: Maybe<Features_Accounts>;
  /** update data of the table: "features_accounts" */
  update_features_accounts?: Maybe<Features_Accounts_Mutation_Response>;
  /** update single row of the table: "features_accounts" */
  update_features_accounts_by_pk?: Maybe<Features_Accounts>;
  /** update multiples rows of table: "features_accounts" */
  update_features_accounts_many?: Maybe<Array<Maybe<Features_Accounts_Mutation_Response>>>;
};


/** mutation root */
export type Mutation_RootDelete_Features_AccountsArgs = {
  where: Features_Accounts_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Features_Accounts_By_PkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootInsert_Features_AccountsArgs = {
  objects: Array<Features_Accounts_Insert_Input>;
  on_conflict?: InputMaybe<Features_Accounts_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Features_Accounts_OneArgs = {
  object: Features_Accounts_Insert_Input;
  on_conflict?: InputMaybe<Features_Accounts_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_Features_AccountsArgs = {
  _inc?: InputMaybe<Features_Accounts_Inc_Input>;
  _set?: InputMaybe<Features_Accounts_Set_Input>;
  where: Features_Accounts_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Features_Accounts_By_PkArgs = {
  _inc?: InputMaybe<Features_Accounts_Inc_Input>;
  _set?: InputMaybe<Features_Accounts_Set_Input>;
  pk_columns: Features_Accounts_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Features_Accounts_ManyArgs = {
  updates: Array<Features_Accounts_Updates>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

export type Query_Root = {
  __typename?: 'query_root';
  /** An array relationship */
  accounts: Array<Accounts>;
  /** An aggregate relationship */
  accounts_aggregate: Accounts_Aggregate;
  /** fetch data from the table: "accounts" using primary key columns */
  accounts_by_pk?: Maybe<Accounts>;
  /** fetch data from the table: "features" */
  features: Array<Features>;
  /** An array relationship */
  features_accounts: Array<Features_Accounts>;
  /** An aggregate relationship */
  features_accounts_aggregate: Features_Accounts_Aggregate;
  /** fetch data from the table: "features_accounts" using primary key columns */
  features_accounts_by_pk?: Maybe<Features_Accounts>;
  /** fetch aggregated fields from the table: "features" */
  features_aggregate: Features_Aggregate;
  /** fetch data from the table: "features" using primary key columns */
  features_by_pk?: Maybe<Features>;
};


export type Query_RootAccountsArgs = {
  distinct_on?: InputMaybe<Array<Accounts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Accounts_Order_By>>;
  where?: InputMaybe<Accounts_Bool_Exp>;
};


export type Query_RootAccounts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Accounts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Accounts_Order_By>>;
  where?: InputMaybe<Accounts_Bool_Exp>;
};


export type Query_RootAccounts_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootFeaturesArgs = {
  distinct_on?: InputMaybe<Array<Features_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Features_Order_By>>;
  where?: InputMaybe<Features_Bool_Exp>;
};


export type Query_RootFeatures_AccountsArgs = {
  distinct_on?: InputMaybe<Array<Features_Accounts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Features_Accounts_Order_By>>;
  where?: InputMaybe<Features_Accounts_Bool_Exp>;
};


export type Query_RootFeatures_Accounts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Features_Accounts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Features_Accounts_Order_By>>;
  where?: InputMaybe<Features_Accounts_Bool_Exp>;
};


export type Query_RootFeatures_Accounts_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootFeatures_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Features_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Features_Order_By>>;
  where?: InputMaybe<Features_Bool_Exp>;
};


export type Query_RootFeatures_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** An array relationship */
  accounts: Array<Accounts>;
  /** An aggregate relationship */
  accounts_aggregate: Accounts_Aggregate;
  /** fetch data from the table: "accounts" using primary key columns */
  accounts_by_pk?: Maybe<Accounts>;
  /** fetch data from the table in a streaming manner: "accounts" */
  accounts_stream: Array<Accounts>;
  /** fetch data from the table: "features" */
  features: Array<Features>;
  /** An array relationship */
  features_accounts: Array<Features_Accounts>;
  /** An aggregate relationship */
  features_accounts_aggregate: Features_Accounts_Aggregate;
  /** fetch data from the table: "features_accounts" using primary key columns */
  features_accounts_by_pk?: Maybe<Features_Accounts>;
  /** fetch data from the table in a streaming manner: "features_accounts" */
  features_accounts_stream: Array<Features_Accounts>;
  /** fetch aggregated fields from the table: "features" */
  features_aggregate: Features_Aggregate;
  /** fetch data from the table: "features" using primary key columns */
  features_by_pk?: Maybe<Features>;
  /** fetch data from the table in a streaming manner: "features" */
  features_stream: Array<Features>;
};


export type Subscription_RootAccountsArgs = {
  distinct_on?: InputMaybe<Array<Accounts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Accounts_Order_By>>;
  where?: InputMaybe<Accounts_Bool_Exp>;
};


export type Subscription_RootAccounts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Accounts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Accounts_Order_By>>;
  where?: InputMaybe<Accounts_Bool_Exp>;
};


export type Subscription_RootAccounts_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootAccounts_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Accounts_Stream_Cursor_Input>>;
  where?: InputMaybe<Accounts_Bool_Exp>;
};


export type Subscription_RootFeaturesArgs = {
  distinct_on?: InputMaybe<Array<Features_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Features_Order_By>>;
  where?: InputMaybe<Features_Bool_Exp>;
};


export type Subscription_RootFeatures_AccountsArgs = {
  distinct_on?: InputMaybe<Array<Features_Accounts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Features_Accounts_Order_By>>;
  where?: InputMaybe<Features_Accounts_Bool_Exp>;
};


export type Subscription_RootFeatures_Accounts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Features_Accounts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Features_Accounts_Order_By>>;
  where?: InputMaybe<Features_Accounts_Bool_Exp>;
};


export type Subscription_RootFeatures_Accounts_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootFeatures_Accounts_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Features_Accounts_Stream_Cursor_Input>>;
  where?: InputMaybe<Features_Accounts_Bool_Exp>;
};


export type Subscription_RootFeatures_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Features_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Features_Order_By>>;
  where?: InputMaybe<Features_Bool_Exp>;
};


export type Subscription_RootFeatures_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootFeatures_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Features_Stream_Cursor_Input>>;
  where?: InputMaybe<Features_Bool_Exp>;
};

/** Boolean expression to compare columns of type "timestamp". All fields are combined with logical 'AND'. */
export type Timestamp_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamp']['input']>;
  _gt?: InputMaybe<Scalars['timestamp']['input']>;
  _gte?: InputMaybe<Scalars['timestamp']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamp']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamp']['input']>;
  _lte?: InputMaybe<Scalars['timestamp']['input']>;
  _neq?: InputMaybe<Scalars['timestamp']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamp']['input']>>;
};

export type FlagshipGetAccountListForFeatureQueryVariables = Exact<{
  featureId: Scalars['String']['input'];
  enabled: Scalars['Boolean']['input'];
}>;


export type FlagshipGetAccountListForFeatureQuery = { __typename?: 'query_root', accounts: Array<{ __typename?: 'accounts', id: number, name?: string | null, account_type: string }>, accounts_aggregate: { __typename?: 'accounts_aggregate', aggregate?: { __typename?: 'accounts_aggregate_fields', count: number } | null } };

export type FlagshipGetAccountListQueryVariables = Exact<{
  take: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
  search: Scalars['String']['input'];
}>;


export type FlagshipGetAccountListQuery = { __typename?: 'query_root', accounts: Array<{ __typename?: 'accounts', id: number, name?: string | null, account_type: string, size?: string | null }>, accounts_aggregate: { __typename?: 'accounts_aggregate', aggregate?: { __typename?: 'accounts_aggregate_fields', count: number } | null } };

export type FlagshipGetAccountQueryVariables = Exact<{
  accountId: Scalars['Int']['input'];
}>;


export type FlagshipGetAccountQuery = { __typename?: 'query_root', accounts_by_pk?: { __typename?: 'accounts', id: number, name?: string | null, account_type: string, size?: string | null } | null };

export type FlagshipGetFeatureListForAccountQueryVariables = Exact<{
  accountId: Scalars['Int']['input'];
}>;


export type FlagshipGetFeatureListForAccountQuery = { __typename?: 'query_root', features: Array<{ __typename?: 'features', id: string, name: string, description?: string | null, enabled: boolean, created_at: string, updated_at: string, features_accounts: Array<{ __typename?: 'features_accounts', enabled: boolean, created_at: string, updated_at: string }> }>, features_aggregate: { __typename?: 'features_aggregate', aggregate?: { __typename?: 'features_aggregate_fields', count: number } | null } };

export type FlagshipGetFeatureListQueryVariables = Exact<{
  take: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
  search: Scalars['String']['input'];
}>;


export type FlagshipGetFeatureListQuery = { __typename?: 'query_root', features: Array<{ __typename?: 'features', id: string, name: string, description?: string | null, enabled: boolean, created_at: string, updated_at: string }>, features_aggregate: { __typename?: 'features_aggregate', aggregate?: { __typename?: 'features_aggregate_fields', count: number } | null } };

export type FlagshipGetFeatureQueryVariables = Exact<{
  featureId: Scalars['String']['input'];
}>;


export type FlagshipGetFeatureQuery = { __typename?: 'query_root', features_by_pk?: { __typename?: 'features', id: string, name: string, description?: string | null, enabled: boolean, created_at: string, updated_at: string } | null };

export type FlagshipUpdateFeatureListMutationVariables = Exact<{
  featuresAccounts: Array<Features_Accounts_Insert_Input> | Features_Accounts_Insert_Input;
}>;


export type FlagshipUpdateFeatureListMutation = { __typename?: 'mutation_root', insert_features_accounts?: { __typename?: 'features_accounts_mutation_response', affected_rows: number } | null };
