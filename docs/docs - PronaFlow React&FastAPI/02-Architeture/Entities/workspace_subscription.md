> Cho phép upgrade tức thì - downgrade theo chu kỳ

# Module 13
|Field|Type|
|---|---|
|id|UUID|
|workspace_id|UUID|
|plan_id|UUID|
|status|enum (ACTIVE / PAST_DUE / CANCELED)|
|current_period_start|timestamp|
|current_period_end|timestamp|
|cancel_at_period_end|boolean|
