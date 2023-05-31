import axios from "axios";
import React from "react";

// Fetches data for a single post using ISR
const fetchPostData = async (id) => {
	const response = await axios.get(
		`https://jsonplaceholder.typicode.com/posts/${id}`,
	);
	return response.data;
};

// Generates static params for all posts using SSG
export async function generateStaticParams() {
	const posts = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
	return posts.data.slice(0, 5).map((post) => ({
		id: post.id.toString(),
	}));
}

export async function generateMetadata({ params }) {
	const data = await fetchPostData(params.id);
	return {
		title: `${data.id} - ${data.title}`,
		description: data.body,
	};
}

// Renders the page with data for a single post
const page = async ({ params }) => {
	const { id } = params;
	const data = await fetchPostData(id);
	return (
		<>
			<h1>ISR + SSG</h1>
			<p>
				{data.id} - {data.title}
			</p>
			<p>{data.body}</p>
		</>
	);
};

export default page;
