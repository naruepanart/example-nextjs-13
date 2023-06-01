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
	const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;
	const options = { next: { revalidate: 60 } };
	const response = await axios.get(url, options);
	return response.data;
};

export async function generateStaticParams() {
	const { data } = await axios.get(
		"https://jsonplaceholder.typicode.com/posts",
	);
	const posts = data
		.slice(0, 5)
		.map((post) => ({ id: post?.id?.toString() ?? "" }));
	return posts;
}

const page = async ({ params }) => {
	const { id } = params;
	const data = await fetchPostData(id);
	return (
		<>
			<h1>ISR + SSG</h1>
			<PageComponent key={data.id} posts={data} />
		</>
	);
};

export default page;
