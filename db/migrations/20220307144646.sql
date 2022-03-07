CREATE TABLE IF NOT EXISTS leads (
    id serial primary key,
    name VARCHAR(50),
    created_at timestamptz DEFAULT (now())
)