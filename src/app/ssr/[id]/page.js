import PageComponents from "../../../components/PageComponents";
import axios from "axios";
import React from "react";

export async function generateMetadata({ params }) {
	const data = await fetchPostData(params.id);
	return {
		title: `${data.id} - ${data.title}`,
		description: data.body,
	};
}

const fetchPostData = async (postId) => {
	const response = await axios.get(
		`https://jsonplaceholder.typicode.com/posts/${postId}`,
		{
			cache: "no-store", // no-store, no-cache is option behaves the same way
		},
	);
	return response.data;
};

const getPostPage = async ({ params }) => {
	const { id } = params;
	const data = await fetchPostData(id);
	return (
		<>
			<h1>SSR</h1>
			<PageComponents key={data.id} posts={data} />
		</>
	);
};

export default getPostPage;
