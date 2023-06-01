import PageComponent from "../../../components/PageComponent";
import axios from "axios";
import React from "react";

export async function generateMetadata({ params }) {
	const postData = await fetchPostData(params.id);
	if (!postData) throw new Error("No data retrieved");
	return {
		title: `${postData.id} - ${postData.title}`,
		description: postData.body,
	};
}

const fetchPostData = async (postId) => {
	const apiUrl = `https://jsonplaceholder.typicode.com/posts/${postId}`;
	try {
		const response = await axios.get(apiUrl);
		return response.data;
	} catch (error) {
		console.error(error);
		throw new Error("Error fetching post data");
	}
};

const getPostPage = async ({ params }) => {
	const { id } = params;
	const data = await fetchPostData(id);
	return (
		<>
			<h1>SSG</h1>
			<PageComponent key={data.id} posts={data} />
		</>
	);
};

export default getPostPage;
