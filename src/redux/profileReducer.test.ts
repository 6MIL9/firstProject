import { PostType, ProfileType } from "../Types/Types";
import profileReducer, { actions } from "./profileReducer";

let state = {
    postsData: [
        { id: 1, post: 'Hi, how are you?', likesCnt: 3 },
        { id: 2, post: 'Nice day to walk', likesCnt: 2 },
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
    newPostText: ''
};

test('length of post should incremented', () => {
    
    let action = actions.addPostCreator('asd');
    let newState = profileReducer(state, action);

    expect(newState.postsData.length).toBe(3);
});

test('after deleting length of post should be decrement', () => {
    
    let action = actions.deletePost(1);
    let newState = profileReducer(state, action);

    expect(newState.postsData.length).toBe(1);
});

test('after deleting length of post shouldt be changed if id incorrect', () => {
    
    let action = actions.deletePost(1000);
    let newState = profileReducer(state, action);

    expect(newState.postsData.length).toBe(2);
});