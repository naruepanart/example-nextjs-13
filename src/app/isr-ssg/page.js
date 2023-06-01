import PageComponent from "../../../components/PageComponent";
import axios from "axios";
import React from "react";

export const metadata = {
	title: "ISR + SSG",
};

const fetchPostData = async () => {
	const url = `https://jsonplaceholder.typicode.com/posts`;
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

const page = async () => {
	const data = await fetchPostData();
	return (
		<>
			<h1>ISR + SSG</h1>
			<PageComponent key={data.id} posts={data} />
		</>
	);
};

export default page;
