# Module 6
|Field|Type|
|---|---|
|note_id (PK)|UUID|
|project_id (FK)|UUID|
|parent_note_id (FK)|UUID|
|author_id (FK)|UUID|
|title|varchar|
|content|text|
|is_private|boolean|
|is_published|boolean|
|created_at|timestamp|