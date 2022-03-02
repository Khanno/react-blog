import createDataContext from './createDataContext';

const blogReducer = (state, action) => {
    switch(action.type) {
        case 'add_blog_post': 
            return [...state, {title: action.payload.title, content: action.payload.content, id: Math.floor(Math.random() * 9999)}];
        case 'delete_blog_post': 
            return state.filter((item) => item.id !== action.payload);
        case 'edit_blog_post':
            return state.map((blogPost) => {
                if(blogPost.id === action.payload.id) {
                    return action.payload;
                } else {
                    return blogPost;
                }
            });
        default:
            return [...state];
    }
};

const addBlogPost = dispatch => {
    return (title, content, callback) => {
        dispatch({ type: 'add_blog_post', payload: { title, content }});
        if(callback) callback();
    }
};

const removeBlogPost = dispatch => {
    return (id) => {
        dispatch({type: 'delete_blog_post', payload: id});
    }
}

const editBlogPost = dispatch => {
    return (id, title, content, callback) => {
        dispatch({type: 'edit_blog_post', payload: { id, title, content }});
        if(callback) callback();
    }
}

export const { Context, Provider } = createDataContext(blogReducer, { addBlogPost, removeBlogPost, editBlogPost}, [{title: 'FIRST POST', content: 'FIRST CONTENT', id: 1}]);