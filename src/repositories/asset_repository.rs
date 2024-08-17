use std::collections::BTreeMap;
use surrealdb::dbs::Session;
use surrealdb::kvs::Datastore;
use surrealdb::sql::{Datetime, Value};

use crate::error::{Error, Result};
use crate::models::asset_model::{CreatableAssetModelNew, NewAssetModel};
use crate::models::ModelCount;
use crate::PER_PAGE;

use super::into_iter_objects;
const ASSET_TABLE: &str = "assets";

#[derive(Clone)]
pub struct AssetRepository {}

impl AssetRepository {
    pub fn new() -> Self {
        AssetRepository {}
    }

    pub async fn paginate(
        &self,
        datastore: &Datastore,
        database_session: &Session,
        start: i64,
    ) -> Result<Vec<NewAssetModel>> {
        let sql = "SELECT * FROM type::table($table) LIMIT $limit START $start;";
        let vars = BTreeMap::from([
            ("limit".into(), PER_PAGE.into()),
            ("start".into(), start.into()),
            ("table".into(), ASSET_TABLE.into()),
        ]);
        let responses = datastore.execute(sql, database_session, Some(vars)).await?;

        let mut asset_list: Vec<NewAssetModel> = Vec::new();

        for object in into_iter_objects(responses)? {
            let asset_object = object?;

            let asset_model: Result<NewAssetModel> = asset_object.try_into();
            asset_list.push(asset_model?);
        }
        Ok(asset_list)
    }

    pub async fn get_total_count(
        &self,
        datastore: &Datastore,
        database_session: &Session,
    ) -> Result<ModelCount> {
        let sql = "SELECT count() FROM assets GROUP ALL;";
        let responses = datastore.execute(sql, database_session, None).await?;

        let result_object_option = into_iter_objects(responses)?.next();
        let result_object = match result_object_option {
            Some(object) => object,
            None => Err(Error::Generic("no record found".to_string())),
        };
        

        match result_object {
            Ok(obj) => obj.try_into(),
            Err(_) => Ok(ModelCount::default()),
        }
    }

    pub async fn create_asset(
        &self,
        datastore: &Datastore,
        database_session: &Session,
        creatable_asset_model: CreatableAssetModelNew,
    ) -> Result<NewAssetModel> {
        let sql = "CREATE assets CONTENT $data";
        let meta = creatable_asset_model.metadata.get_file_metadata();
        let metadata: BTreeMap<String, Value> = [
            ("file_type".into(), meta.file_type.into()),
        ].into();

        let data: BTreeMap<String, Value> = [
            ("name".into(), creatable_asset_model.name.into()),
            ("path".into(), creatable_asset_model.path.into(),),
            ("parent_id".into(), creatable_asset_model.parent_id.into()),
            ("asset_type".into(), creatable_asset_model.asset_type.into()),
            ("metadata".into(), metadata.into()),
            ("created_by".into(), creatable_asset_model.logged_in_username.clone().into(),),
            ("updated_by".into(), creatable_asset_model.logged_in_username.into(),),
            ("created_at".into(), Datetime::default().into()),
            ("updated_at".into(), Datetime::default().into()),
        ].into();

        let vars: BTreeMap<String, Value> = [("data".into(), data.into())].into();

        let responses = datastore.execute(sql, database_session, Some(vars)).await?;

        let result_object_option = into_iter_objects(responses)?.next();
        let result_object = match result_object_option {
            Some(object) => object,
            None => Err(Error::CreateModelError("cannot create assets record".to_string())),
        };
        let asset_model: Result<NewAssetModel> = result_object?.try_into();

        asset_model
    }

    pub async fn create_asset_folder(
        &self,
        datastore: &Datastore,
        database_session: &Session,
        creatable_asset_model: CreatableAssetModelNew,
    ) -> Result<NewAssetModel> {
        let sql = "CREATE assets CONTENT $data";
        let metadata = "{}";

        let data: BTreeMap<String, Value> = [
            ("name".into(), creatable_asset_model.name.into()),
            ("path".into(), creatable_asset_model.path.into(),),
            ("parent_id".into(), creatable_asset_model.parent_id.into()),
            ("metadata".into(), metadata.into()),
            ("created_by".into(), creatable_asset_model.logged_in_username.clone().into(),),
            ("updated_by".into(), creatable_asset_model.logged_in_username.into(),),
            ("created_at".into(), Datetime::default().into()),
            ("updated_at".into(), Datetime::default().into()),
        ]
            .into();
        let vars: BTreeMap<String, Value> = [("data".into(), data.into())].into();

        let responses = datastore.execute(sql, database_session, Some(vars)).await?;

        let result_object_option = into_iter_objects(responses)?.next();
        let result_object = match result_object_option {
            Some(object) => object,
            None => Err(Error::CreateModelError("cannot create assets record".to_string())),
        };
        let asset_model: Result<NewAssetModel> = result_object?.try_into();

        asset_model
    }
}
