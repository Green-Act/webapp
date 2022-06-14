const getTrimmedHash = (hash: string, size: number) => {
  return `${hash.slice(0, size)}...${hash.slice(-size)}`;
};

export default getTrimmedHash;
