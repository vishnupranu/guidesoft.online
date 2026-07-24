# Setup Notion Blog

**Description:** Guide for setting up a Notion blog with Vercel.
**Category:** Coding / Boilerplate Setup

## Getting Started
To view the steps to setup Notion to work with this example view the post at https://notion-blog.vercel.app/blog/my-first-post or follow the steps below.

## Deploy Your Own
Deploy your own Notion blog with Vercel.

or

1. **Clone this repo**: `git clone https://github.com/ijjk/notion-blog.git`
2. **Configure project with vc**
3. **Add your NOTION_TOKEN and BLOG_INDEX_ID** as environment variables in your project.
4. **Do final deployment with vc**
*Note: if redeploying with vc locally and you haven't made any changes to the application's source and only edited in Notion you will need use `vc -f` to bypass build de-duping*

## Creating Your Pages Table
Note: this is auto run if a table isn't detected the first time visiting `/blog`

### Using the Pre-Configured Script
1. Create a blank page in Notion
2. Clone this repo: `git clone https://github.com/ijjk/notion-blog.git`
3. Install dependencies: `cd notion-blog && yarn`
4. Run script to create table: `NOTION_TOKEN='token' BLOG_INDEX_ID='new-page-id' node scripts/create-table.js`

### Manually Creating the Table
1. Create a blank page in Notion
2. Create an inline table on that page, don't use a full page table.
3. The table should have the following properties:
   - **Page**: this the blog post's page
   - **Slug**: text property
   - **Published**: checkbox property
   - **Date**: date property
   - **Authors**: person property

## Running Locally
1. Install dependencies: `yarn`
2. Expose NOTION_TOKEN and BLOG_INDEX_ID in your environment: `export NOTION_TOKEN='<your-token>'` and `export BLOG_INDEX_ID='<your-blog-index-id>'` (or `set` for Windows)
3. Run next in development mode: `yarn dev`
4. Build and run in production mode: `yarn build && yarn start`
