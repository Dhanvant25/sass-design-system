// api/http.js
import axiosInstance from "./axiosInstance";

const normalizeAxiosError = (err) => {
  const status = err?.response?.status ?? null;
  const data = err?.response?.data ?? null;
  const message =
    data?.message || err?.message || "Something went wrong. Please try again.";

  return { status, message, data };
};

const useGet = async (url, params = {}, config = {}) => {
  try {
    const res = await axiosInstance.get(url, { params, ...config });
    return { res: res.data, error: null };
  } catch (err) {
    return { res: null, error: normalizeAxiosError(err) };
  }
};

const usePost = async (url, body = {}, config = {}) => {
  try {
    const res = await axiosInstance.post(url, body, config);
    return res;
  } catch (err) {
    return normalizeAxiosError(err);
  }
};

const usePut = async (url, body = {}, config = {}) => {
  try {
    const res = await axiosInstance.put(url, body, config);
    return res;
  } catch (err) {
    return normalizeAxiosError(err);
  }
};

const usePatch = async (url, body = {}, config = {}) => {
  try {
    const res = await axiosInstance.patch(url, body, config);
    return res;
  } catch (err) {
    return normalizeAxiosError(err);
  }
};

const useDelete = async (url, body = {}, config = {}) => {
  try {
    const res = await axiosInstance.delete(url, { data: body, ...config });
    return res;
  } catch (err) {
    return normalizeAxiosError(err);
  }
};

export { useGet, usePost, usePut, usePatch, useDelete };
