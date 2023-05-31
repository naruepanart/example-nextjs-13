import axios from "axios";
import React from "react";

const fetchPostData = async (id) => {
	const response = await axios.get(
		`https://jsonplaceholder.typicode.com/posts/${id}`,
		{
			next: { revalidate: 60 }, // ISR
		},
	);
	return response.data;
};

export async function generateStaticParams() {
	const posts = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
	return posts.data.map((x) => ({
		params: { id: x.id }, // SSG
	}));
}

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
