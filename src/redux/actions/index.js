
export const addArticle = article => ({
  type: 'ADD_ARTICLE',
  payload: article
});

export const getProducts = () => (
  (dispatch) => {
    fetch('http://5bb1b4be6418d70014071c79.mockapi.io/api/products')
      .then( res => res.json())
      .then(res => {
        dispatch(addArticle(res));
      });
  }
)
