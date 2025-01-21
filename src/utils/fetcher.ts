const fetcher = async (url: RequestInfo | URL, token?: string) => {
    return await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(async res => await res.json()).catch(() => null);
};

export default fetcher;
