const API_URL = import.meta.env.SSR ? 'http://localhost:3000' : '';

export const articleService = {
  // 获取所有文章
  async getArticles() {
    const response = await fetch(`${API_URL}/api/articles`);
    if (!response.ok) throw new Error('Failed to fetch articles');
    return response.json();
  },
  
  // 获取单篇文章
  async getArticle(id) {
    const response = await fetch(`${API_URL}/api/articles/${id}`);
    if (!response.ok) throw new Error('Failed to fetch article');
    return response.json();
  },
  
  // 创建文章
  async createArticle(article) {
    const response = await fetch(`${API_URL}/api/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(article)
    });
    if (!response.ok) throw new Error('Failed to create article');
    return response.json();
  },
  
  // 更新文章
  async updateArticle(id, article) {
    const response = await fetch(`${API_URL}/api/articles/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(article)
    });
    if (!response.ok) throw new Error('Failed to update article');
    return response.json();
  },
  
  // 删除文章
  async deleteArticle(id) {
    const response = await fetch(`${API_URL}/api/articles/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete article');
    return response.json();
  }
};