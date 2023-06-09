"use client";
import PageIDComponent from "@/components/PageIDComponent";
import React, { useEffect, useState } from "react";

const CsrIdPageComponent = (props) => {
	const { id } = props;
	const [data, setData] = useState([]);

	const fetchPosts = async () => {
		const postUrl = `https://jsonplaceholder.typicode.com/posts/${id}`;
		const response = await fetch(postUrl);
		const post = await response.json();
		setData(post);
	};

	useEffect(() => {
		fetchPosts();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<PageIDComponent key={data.id} posts={data} />
		</>
	);
};

export default CsrIdPageComponent;
