import createDataContext from './createDataContext';

const blogReducer = (state, action) => {
    switch(action.type) {
        case 'add_blog_post': 
            return [...state, {title: `Blog Post #${state.length + 1}`, id: Math.floor(Math.random() * 99999)}];
        case 'delete_blog_post': 
            return state.filter((item) => item.id !== action.payload);
        default:
            return [...state];
    }
};

const addBlogPost = dispatch => {
    return () => {
        dispatch({ type: 'add_blog_post'});
    }
};

const removeBlogPost = (dispatch) => {
    return (id) => {
        dispatch({type: 'delete_blog_post', payload: id});
    }
}

export const { Context, Provider } = createDataContext(blogReducer, { addBlogPost, removeBlogPost }, []);