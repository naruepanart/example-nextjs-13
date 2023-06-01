import PageComponents from "../../../../components/PageComponents";
import axios from "axios";
import React from "react";

export async function generateMetadata({ params }) {
	const data = await fetchPostData(params.id);
	return {
		title: `${data.id} - ${data.title}`,
		description: data.body,
	};
}

// Fetches data for a single post using ISR
const fetchPostData = async (postId) => {
	const response = await axios.get(
		`https://jsonplaceholder.typicode.com/posts/${postId}`,
		{ next: { revalidate: 60 } },
	);
	return response.data;
};

// Generates static params for all posts using SSG
export async function generateStaticParams() {
	const response = await axios.get(
		`https://jsonplaceholder.typicode.com/posts`,
	);
	const posts = response.data.slice(0, 5);
	const formattedPosts = posts.map((post) => {
		return {
			id: post.id.toString(),
		};
	});
	return formattedPosts;
}

// Renders the page with data for a single post
const page = async ({ params }) => {
	const { id } = params;
	const data = await fetchPostData(id);
	return (
		<>
			<h1>ISR + SSG</h1>
			<PageComponents key={data.id} posts={data} />
		</>
	);
};

export default page;
