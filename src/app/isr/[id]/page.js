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
			next: { revalidate: 60 },
		},
	);
	return response.data;
};

const page = async ({ params }) => {
	const { id } = params;
	const data = await fetchPostData(id);
	return (
		<>
			<h1>ISR</h1>
			<PageComponents key={data.id} posts={data} />
		</>
	);
};

export default page;
