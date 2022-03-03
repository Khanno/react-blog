import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer';

const blogReducer = (state, action) => {
    switch (action.type) {
        case 'get_blog_post':
            return action.payload;
        case 'delete_blog_post':
            return state.filter((item) => item.id !== action.payload);
        case 'edit_blog_post':
            return state.map((blogPost) => {
                if (blogPost.id === action.payload.id) {
                    return action.payload;
                } else {
                    return blogPost; 
                }
            });
        default:
            return [...state];
    }
};

const getBlogPosts = dispatch => {
    return async () => {
        const response = await jsonServer.get('/blogpost');
        dispatch({
            type: 'get_blog_post',
            payload: response.data
        });
    };
};

const addBlogPost = dispatch => {
    return async (title, content, callback) => {
        await jsonServer.post('/blogpost', {
            title,
            content
        });
        if(callback) callback();
    }
};

const removeBlogPost = dispatch => {
    return async (id) => {
        await jsonServer.delete(`/blogpost/${id}`);
        dispatch({
            type: 'delete_blog_post',
            payload: id
        });
    }
}

const editBlogPost = dispatch => {
    return async (id, title, content, callback) => {
        await jsonServer.put(`/blogpost/${id}`, {
            title,
            content,
        });
        dispatch({
            type: 'edit_blog_post',
            payload: {
                id,
                title,
                content
            }
        });
        if (callback) callback();
    }
}

export const {
    Context,
    Provider
} = createDataContext(blogReducer, {
    getBlogPosts,
    addBlogPost,
    removeBlogPost,
    editBlogPost
}, []);