import PageComponent from "../../../components/PageComponent";
import axios from "axios";
import React, { cache } from "react";

export async function generateMetadata({ params }) {
	const data = await cache(fetchPostData(params.id));
	return {
		title: `${data.id} - ${data.title}`,
		description: data.body,
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
