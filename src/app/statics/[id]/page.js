import PageIDComponent from "@/components/PageIDComponent";
import React from "react";

export async function generateMetadata({ params }) {
	const postData = await fetchPostData(params.id);
	return {
		title: `${postData.id} - ${postData.title}`,
		description: postData.body,
	};
}

const fetchPostData = async (postId) => {
	const postUrl = `https://jsonplaceholder.typicode.com/posts/${postId}`;
	const postResponse = await fetch(postUrl);
	const postData = await postResponse.json();
	return postData;
};

const page = async ({ params }) => {
	const { id } = params;
	const data = await fetchPostData(id);
	return (
		<>
			<h1>Static - {id}</h1>
			<PageIDComponent key={data.id} posts={data} />
		</>
	);
};

export default page;
