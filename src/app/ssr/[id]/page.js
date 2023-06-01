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
	try {
		const apiUrl = `https://jsonplaceholder.typicode.com/posts/${postId}`;
		const response = await axios.get(apiUrl, { cache: "no-store" });
		if (response.status !== 200) {
			throw new Error(`Unexpected response status: ${response.status}`);
		}
		return response.data;
	} catch (error) {
		console.error(error);
		throw new Error(`Failed to fetch post data: ${error.message}`);
	}
};

const getPostPage = async ({ params }) => {
	const { id } = params;
	const data = await fetchPostData(id);
	return (
		<>
			<h1>SSR</h1>
			<PageComponent key={data.id} posts={data} />
		</>
	);
};

export default getPostPage;
