import path from "path";

export const getExtraResourceFilePath = (fileName: string) => {
    return process.env.NODE_ENV === "development"
        ? path.join(__dirname, "..", "extraResources", fileName)
        : path.join(process.resourcesPath, "extraResources", fileName);
};

export const getThreadFilePath = (fileName: string) => {
    return path.join(__dirname, "..", "threads", fileName);
};
