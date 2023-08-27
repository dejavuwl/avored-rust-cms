use axum::extract::{Multipart, Path, State};
use axum::response::{IntoResponse, Redirect};
use rand::distributions::Alphanumeric;
use rand::Rng;
use std::path::Path as stdPath;
use std::sync::Arc;
use urlencoding::decode_binary;

use crate::avored_state::AvoRedState;
use crate::models::admin_user_model::{AdminUser, UpdatableAdminUser};
use crate::providers::avored_session_provider::AvoRedSession;
use crate::requests::update_admin_user_request::UpdateAdminUserRequest;

pub async fn update_admin_user_handler(
    state: State<Arc<AvoRedState>>,
    Path(admin_user_id): Path<String>,
    mut session: AvoRedSession,
    mut multipart: Multipart,
) -> Result<impl IntoResponse, impl IntoResponse> {
    let logged_in_user = match session.get("logged_in_user") {
        Some(logged_in_user) => logged_in_user,
        None => AdminUser::empty_admin_user(),
    };

    let mut payload = UpdateAdminUserRequest {
        full_name: String::from(""),
        is_super_admin: false,
    };

    let mut profile_image = String::from("");
    let mut existing_profile_image = String::from("");

    while let Some(field) = multipart.next_field().await.unwrap() {
        let name = field.name().unwrap().to_string();

        match name.as_ref() {
            "image" => {
                let s: String = rand::thread_rng()
                    .sample_iter(&Alphanumeric)
                    .take(32)
                    .map(char::from)
                    .collect();

                // let file_content_test = field.content_type().unwrap().to_string();
                let file_name = field.file_name().unwrap().to_string();

                println!("file name: {}", file_name);

                let file_ext = file_name.split(".").last().unwrap_or(".png");

                let data = field.bytes().await.unwrap();

                let new_file_name = format!("{}.{}", s, file_ext);

                let file_name = stdPath::new(&new_file_name).file_name().unwrap();

                profile_image = format!("upload/{}", new_file_name);
                let full_path = stdPath::new("public").join("upload").join(file_name);
                tokio::fs::write(full_path, data).await.unwrap();
            }
            "full_name" => {
                let bytes = field.bytes().await.unwrap();
                let decoded = decode_binary(&bytes).into_owned();
                let full_name = String::from_utf8_lossy(&decoded).into_owned();

                payload.full_name = full_name;
            }
            "existing_profile_image" => {
                let bytes = field.bytes().await.unwrap();
                let decoded = decode_binary(&bytes).into_owned();
                existing_profile_image = String::from_utf8_lossy(&decoded).into_owned();
            }
            "is_super_admin" => {
                let bytes = field.bytes().await.unwrap();
                let decoded = decode_binary(&bytes).into_owned();

                let string_super_admin = String::from_utf8_lossy(&decoded).into_owned();
                let mut bool_super_admin = false;
                if string_super_admin.eq("1") {
                    bool_super_admin = true;
                }

                payload.is_super_admin = bool_super_admin;
            }
            &_ => continue,
        }
    }

    let mut has_error = false;

    if payload.full_name.len() <= 0 {
        has_error = true;
        session
            .insert(
                "validation_error_full_name",
                String::from("Full name is required field"),
            )
            .expect("Could not store the validation errors into session.");
    }

    if has_error {
        let redirect_url = format!(
            "{}{}",
            String::from("/admin/edit-admin-user/"),
            admin_user_id
        );
        return Err(Redirect::to(&redirect_url).into_response());
    }

    if profile_image.len() <= 0 {
        profile_image = existing_profile_image;
    }

    let updatable_admin_user = UpdatableAdminUser {
        id: admin_user_id,
        full_name: payload.full_name,
        is_super_admin: payload.is_super_admin,
        profile_image,
        logged_in_username: logged_in_user.email,
    };

    let _updated_admin_user = state
        .admin_user_repository
        .update_admin_user(
            &state.datastore,
            &state.database_session,
            updatable_admin_user,
        )
        .await;

    Ok(Redirect::to("/admin/admin-user").into_response())

    // Json(admin_users).into_response()
}
