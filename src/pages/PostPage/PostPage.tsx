import { MainLayout } from '../../layouts/MainLayout';
import React from 'react';
import PostComments from '../../components/PostComments'
import FullPost from '../../components/FullPost'


const PostPage = () => {
  return (
    <MainLayout className="mb-50" contentFullWidth>
      <FullPost />
      <PostComments />
    </MainLayout>
  );
}

export default PostPage