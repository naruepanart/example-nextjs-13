import PageComponents from "../../../components/PageComponents";
import axios from "axios";
import React from "react";

const fetchPostData = async (postId) => {
	const response = await axios.get(
		`https://jsonplaceholder.typicode.com/posts/${postId}`,
	);
	return response.data;
};

export async function generateMetadata({ params }) {
	const data = await fetchPostData(params.id);
	return {
		title: `${data.id} - ${data.title}`,
		description: data.body,
	};
}

const getPostPage = async ({ params }) => {
	const { id } = params;
	const data = await fetchPostData(id);
	return (
		<>
			<h1>SSG</h1>
			<PageComponents key={data.id} posts={data} />
		</>
	);
};

export default getPostPage;
