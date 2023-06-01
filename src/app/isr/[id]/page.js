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
	const postResponse = await axios.get(
		`https://jsonplaceholder.typicode.com/posts/${postId}`,
		{ next: { revalidate: 60 } },
	);
	return postResponse.data;
};

const page = async ({ params }) => {
	const { id } = params;
	const data = await fetchPostData(id);
	return (
		<>
			<h1>ISR</h1>
			<PageComponent key={data.id} posts={data} />
		</>
	);
};

export default page;
