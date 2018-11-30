import React from "react";
import { Table } from "reactstrap";
import PostListItem from "./PostListItem";

export default ({ posts }) => {
  return (
    <div id="post-list">
      <h4>My Posts</h4>
      <Table>
        <thead>
          <tr>
            <td>photo</td>
            <td>tags</td>
            <td>date</td>
            <td />
          </tr>
        </thead>
        <tbody>
          {posts.map(post => {
            return <PostListItem post={post} key={post._id} />;
          })}
        </tbody>
      </Table>
    </div>
  );
};
