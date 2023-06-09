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
	const apiUrl = `https://jsonplaceholder.typicode.com/posts/${postId}`;
	const cacheOptions = { cache: "no-store" };
	//const cacheOptions = { next: { revalidate: 0 } }
	const response = await fetch(apiUrl, cacheOptions); // getServerSideProps
	return response.json();
};

const page = async ({ params }) => {
	const { id } = params;
	const data = await fetchPostData(id);
	return (
		<>
			<h1>SSR - {id}</h1>
			<PageIDComponent key={data.id} posts={data} />
		</>
	);
};

export default page;
