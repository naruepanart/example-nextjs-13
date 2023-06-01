import PageComponent from "../../../components/PageComponent";
import axios from "axios";
import React, { cache } from "react";

export async function generateMetadata({ id }) {
	try {
		const post = await cache(fetchPostData(id));
		if (!post) throw new Error("No data retrieved");
		const title = `${post.id} - ${post.title}`;
		const description = post.body;
		return { title, description };
	} catch (error) {
		throw new Error("Failed to generate metadata");
	}
}

const fetchPostData = async (postId) => {
	try {
		const postResponse = await axios.get(
			`https://jsonplaceholder.typicode.com/posts/${postId}`,
			{ next: { revalidate: 60 } },
		);
		return postResponse.data;
	} catch (error) {
		throw error;
	}
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
