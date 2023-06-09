import PageIDComponent from "@/components/PageIDComponent";
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
	const response = await fetch(url, options);
	const data = await response.json();
	return data;
};

export async function generateStaticParams() {
	const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
	const data = await response.json();
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
			<h1>ISG - {id}</h1>
			<PageIDComponent key={data.id} posts={data} link={`/dynamics/isg`}/>
		</>
	);
};

export default page;
