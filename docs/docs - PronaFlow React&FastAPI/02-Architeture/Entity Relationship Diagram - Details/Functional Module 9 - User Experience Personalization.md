# Entity

# ERD
```mermaid
erDiagram
    USER ||--|| USER_SETTINGS : personalizes
    USER ||--o{ DASHBOARD_LAYOUT : customizes
    USER ||--o{ USER_WIDGET_CONFIG : configures
    USER ||--o{ KEYBOARD_SHORTCUT : defines
    USER ||--o{ UI_VIEW_PREFERENCE : prefers

    UI_WIDGET ||--o{ USER_WIDGET_CONFIG : rendered_as

```