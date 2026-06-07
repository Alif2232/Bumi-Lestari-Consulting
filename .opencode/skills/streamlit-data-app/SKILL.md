---
name: streamlit-data-app
description: Best practices for building production-grade Streamlit data apps — layout, caching, session state, performance, and integration with Python ML/LLM backends
license: MIT
compatibility: opencode
metadata:
  audience: data-engineers
  stack: streamlit
---

## What I do

Provide canonical patterns for building Streamlit applications — from simple dashboards to production data apps that integrate with Python ML/LLM backends.

## When to use me

Load this skill when:
- Building a new Streamlit app
- Structuring a multi-page Streamlit app
- Optimizing slow Streamlit performance
- Managing session state, auth, or user input
- Integrating Streamlit with an LLM (chat, completions)
- Deploying Streamlit to Streamlit Community Cloud, Docker, or a custom server

## Project Structure

```
apps/streamlit/
├── app.py                        # Entry point (Streamlit Community Cloud looks for this)
├── Home.py                       # OR alternative entry (multi-page convention)
├── pages/                        # Auto-discovered as multi-page nav
│   ├── 1_📊_Dashboard.py
│   ├── 2_🤖_Chat.py
│   └── 3_⚙️_Settings.py
├── src/
│   ├── components/               # Custom Streamlit components
│   ├── data/                     # Data loaders, schemas
│   ├── llm/                      # LLM client wrappers
│   ├── viz/                      # Plotly/Matplotlib helpers
│   └── utils.py
├── .streamlit/
│   ├── config.toml               # Theme, server settings
│   └── secrets.toml              # Local secrets (gitignored)
├── tests/                        # pytest
├── requirements.txt
├── pyproject.toml
└── README.md
```

**Multi-page convention:** files in `pages/` are auto-discovered. Prefix with a number to control order (`1_📊_Dashboard.py`).

## Layout Patterns

### Container-based layout

```python
import streamlit as st

# Wide layout (default is 'centered')
st.set_page_config(layout="wide", page_title="Acme Analytics")

# Sidebar for filters
with st.sidebar:
    date_range = st.date_input("Date range", value=(date(2024, 1, 1), date.today()))
    metric = st.selectbox("Metric", ["revenue", "users", "churn"])

# Main content in columns
col1, col2, col3 = st.columns(3)
with col1:
    st.metric("Total Revenue", "$1.2M", "+12%")
with col2:
    st.metric("Active Users", "8,432", "+3%")
with col3:
    st.metric("Churn", "2.1%", "-0.4%")

# Tabs for related views
tab1, tab2 = st.tabs(["📈 Trends", "📋 Raw Data"])
with tab1:
    st.line_chart(df)
with tab2:
    st.dataframe(df, use_container_width=True)
```

### Container for grouping

```python
with st.container(border=True):
    st.subheader("KPI Card")
    st.metric("Value", 1234)
```

### `st.empty()` for live updates

```python
import time

placeholder = st.empty()
for i in range(100):
    placeholder.progress(i, text=f"Step {i}/100")
    time.sleep(0.05)
placeholder.success("Done!")
```

## Caching — The Most Important Performance Lever

Streamlit reruns the **entire script** on every user interaction. Without caching, this destroys performance.

### `@st.cache_data` — for data (return values must be serializable)

```python
@st.cache_data(ttl=600)  # Cache for 10 minutes
def load_data(query: str) -> pd.DataFrame:
    return pd.read_sql(query, engine)

@st.cache_data
def expensive_computation(df: pd.DataFrame, param: int) -> pd.DataFrame:
    # Heavy processing
    return result

# Usage
df = load_data("SELECT * FROM users")
result = expensive_computation(df, param=42)
```

**Use for:** DataFrames, JSON-serializable results, API responses, computed aggregations.

### `@st.cache_resource` — for connections and models (singletons)

```python
@st.cache_resource
def get_db_engine():
    return create_engine(DATABASE_URL)

@st.cache_resource
def get_llm_client():
    return OpenAI(api_key=st.secrets["OPENAI_API_KEY"])

@st.cache_resource
def get_ml_model():
    return load_model("model.pkl")
```

**Use for:** DB connections, ML models, HTTP clients, anything that should be a singleton.

### When to invalidate

```python
# Manual clear
st.cache_data.clear()
st.cache_resource.clear()

# Auto-invalidate on file change (great for dev)
@st.cache_data
def load_data(path: str):
    return pd.read_csv(path)
# Edit the file → cache invalidates automatically
```

### What NOT to cache

- ❌ Streamlit widgets or session state
- ❌ Functions that take unhashable args (lists, dicts as primary arg — use tuples)
- ❌ Side-effect functions (logging, sending email) — use once-per-session instead

## Session State — User Input Persistence

Streamlit reruns on every interaction. To persist state, use `st.session_state`:

```python
# Initialize (idempotent)
if "messages" not in st.session_state:
    st.session_state.messages = []

if "user_id" not in st.session_state:
    st.session_state.user_id = None

# Use
st.session_state.messages.append({"role": "user", "content": input})
```

### Form pattern (batch inputs)

```python
with st.form("settings_form"):
    name = st.text_input("Name")
    email = st.text_input("Email")
    submitted = st.form_submit_button("Save")

if submitted:
    # All form values available, single rerun
    save_settings(name, email)
    st.success("Saved!")
```

### Button callbacks (cleaner state mutations)

```python
def add_item():
    st.session_state.items.append(new_item)

st.button("Add", on_click=add_item)
```

## LLM Integration

### Streaming chat (Vercel AI SDK has nothing here; use `streamlit.write_stream`)

```python
from openai import OpenAI

client = OpenAI(api_key=st.secrets["OPENAI_API_KEY"])

# Display history
for msg in st.session_state.messages:
    with st.chat_message(msg["role"]):
        st.write(msg["content"])

# User input
if prompt := st.chat_input("Ask anything"):
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user"):
        st.write(prompt)

    # Stream response
    with st.chat_message("assistant"):
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=st.session_state.messages,
            stream=True,
        )
        full = st.write_stream(response)  # Streamlit 1.32+
    st.session_state.messages.append({"role": "assistant", "content": full})
```

### RAG integration

```python
@st.cache_resource
def get_rag_pipeline():
    return RAGPipeline(
        vector_db=connect_pgvector(st.secrets["DATABASE_URL"]),
        llm=OpenAI(api_key=st.secrets["OPENAI_API_KEY"]),
    )

rag = get_rag_pipeline()

query = st.text_input("Search documents")
if query:
    with st.spinner("Searching..."):
        result = rag.query(query)
    st.write(result.answer)
    with st.expander("Sources"):
        for i, src in enumerate(result.sources, 1):
            st.markdown(f"[{i}] {src.content}\n*Source: {src.metadata['source']}*")
```

## Performance Optimization

| Issue | Cause | Fix |
|---|---|---|
| Slow first load | Heavy import / data load | Use `@st.cache_resource` and `@st.cache_data` |
| Laggy interactions | Rerun on every widget change | Use `st.form` to batch inputs |
| Expensive computation reruns | No cache | `@st.cache_data` with correct `ttl` |
| Database connection storm | New connection per rerun | `@st.cache_resource` for the engine |
| Memory bloat | Caching too much | Set `ttl` and `max_entries`; clear periodically |
| Charts slow with huge DataFrames | Browser rendering 100k rows | Aggregate before plotting; show summary + drilldown |
| Token-by-token LLM feels laggy | Synchronous + no streaming | Use `stream=True` + `st.write_stream` |

```python
# Limit cache entries
@st.cache_data(max_entries=100, ttl=3600)
def fetch_data(query_id: str):
    ...
```

## Configuration

```toml
# .streamlit/config.toml
[server]
headless = true
port = 8501
enableCORS = false
enableXsrfProtection = true

[browser]
gatherUsageStats = false

[theme]
base = "light"
primaryColor = "#FF6B6B"
backgroundColor = "#FFFFFF"
secondaryBackgroundColor = "#F0F2F6"
textColor = "#262730"
font = "sans serif"

[client]
toolbarMode = "minimal"  # Hide the "Made with Streamlit" footer
```

```toml
# .streamlit/secrets.toml (NEVER commit)
OPENAI_API_KEY = "sk-..."
DATABASE_URL = "postgresql://..."
```

```python
# Access in code
api_key = st.secrets["OPENAI_API_KEY"]
```

For production, use environment variables or a secret manager (AWS Secrets Manager, GCP Secret Manager) instead of `secrets.toml`.

## Authentication

```python
import streamlit_authenticator as stauth

authenticator = stauth.Authenticate(
    credentials,
    cookie_name="acme_auth",
    key=st.secrets["auth_key"],
    cookie_expiry_days=30,
)

name, authentication_status, username = authenticator.login("Login", "main")

if authentication_status:
    authenticator.logout("Logout", "sidebar")
    st.write(f"Welcome {name}")
    # Protected content
elif authentication_status is False:
    st.error("Username/password is incorrect")
elif authentication_status is None:
    st.warning("Please enter your username and password")
```

**For production, prefer OAuth/SSO** (Google, Auth0, Okta) over username/password. Use `streamlit-authenticator` for the UI scaffold, then plug in your IdP.

## Deployment

### Streamlit Community Cloud (free, public repos)

1. Push to GitHub
2. Go to [share.streamlit.io](https://share.streamlit.io)
3. Connect repo, set `app.py` as entry, add secrets
4. Auto-deploys on push to main

### Docker (self-hosted)

```dockerfile
FROM python:3.12-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8501
HEALTHCHECK CMD curl --fail http://localhost:8501/_stcore/health

ENTRYPOINT ["streamlit", "run", "app.py", "--server.port=8501", "--server.address=0.0.0.0"]
```

```yaml
# docker-compose.yml
services:
  streamlit:
    build: ./apps/streamlit
    ports: ["8501:8501"]
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - OPENAI_API_KEY=${OPENAI_API_KEY}
    restart: unless-stopped
```

### Behind a reverse proxy (nginx)

```nginx
location /streamlit/ {
    proxy_pass http://streamlit:8501/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $host;
    # WebSocket support
    proxy_read_timeout 86400;
}
```

## Testing

```python
# tests/test_app.py
from streamlit.testing.v1 import AppTest

def test_home_page_renders():
    at = AppTest.from_file("app.py").run()
    assert at.title[0].value == "Acme Analytics"

def test_metric_displays():
    at = AppTest.from_file("app.py").run()
    assert len(at.metric) >= 1
```

**Streamlit AppTest** (since 1.28) is the official way to test Streamlit apps programmatically.

## Common Anti-Patterns

| Anti-pattern | Why bad | Fix |
|---|---|---|
| Loading data on every rerun | Slow, expensive | `@st.cache_data` |
| Creating DB engine on every rerun | Connection storm | `@st.cache_resource` |
| Using `st.session_state` as a list without `if not in` | Resets on first load | Initialize in `if "key" not in st.session_state` |
| Big scripts with no functions | Hard to test | Refactor into `src/` modules |
| Secrets in code or git | Security breach | `st.secrets` + gitignore |
| No error handling around API calls | App crashes on API failure | Try/except + `st.error` |
| Mixing LLM calls with sync UI | UI freezes during generation | Stream + `st.write_stream` + `st.status` |
| Hardcoded paths (`/Users/me/data.csv`) | Breaks for everyone else | Use relative paths + env vars |
| Running on port 8501 in prod without auth | Public access | Add auth + reverse proxy |
