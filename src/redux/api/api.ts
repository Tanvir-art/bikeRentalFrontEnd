import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store"; // Assuming you have a RootState defined

export const bikeApi = createApi({
  reducerPath: "bikeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bike-backend-ashy.vercel.app",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["user", "bike", "rentals", "coupon"],
  endpoints: (builder) => ({
    addUser: builder.mutation({
      query: (data) => ({
        url: "/api/auth/signup",
        method: "POST",
        body: data,
      }),
    }),

    loginUser: builder.mutation({
      query: (data) => ({
        url: "/api/auth/login",
        method: "POST",
        body: data,
      }),
    }),

    usersMe: builder.query({
      query: () => ({
        url: "/api/users/me",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    updateUserByOwn: builder.mutation({
      query: (data) => ({
        url: `/api/users/me`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    //admin
    updateUserByAdmin: builder.mutation({
      query: (data) => ({
        url: `/api/auth/users/${data._id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),

    getAlluserByAdmin: builder.query({
      query: () => ({
        url: "/api/auth/all",
        method: "GET",
      }),
      providesTags: ["user"],
    }),

    deleteUserByAdmin: builder.mutation({
      query: (id) => ({
        url: `/api/auth/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),
    // bike
    addBike: builder.mutation({
      query: (data) => ({
        url: "/api/bikes",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["bike"],
    }),
    getBikes: builder.query({
      query: () => ({
        url: "/api/bikes",
        method: "GET",
      }),
      providesTags: ["bike"],
    }),
    updateBike: builder.mutation({
      query: (data) => ({
        url: `/api/bikes/${data._id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["bike"],
    }),
    deleteBike: builder.mutation({
      query: (id) => ({
        url: `/api/bikes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["bike"],
    }),
    getRentalsBike: builder.query({
      query: () => ({
        url: `/api/rentals`,
        method: "GET",
      }),
      providesTags: ["rentals"],
    }),
    // payment api
    advancePayment: builder.mutation({
      query: (data) => ({
        url: "/api/rentals",
        method: "POST",
        body: data,
      }),
    }),
    claculatePayment: builder.mutation({
      query: (rentalId) => ({
        url: `/api/rentals/${rentalId}/return`,
        method: "PUT",
      }),
      invalidatesTags: ["rentals"],
    }),
    //coupon
    addCoupon: builder.mutation({
      query: (data) => ({
        url: "/api/coupon",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["coupon"],
    }),
    getCoupon: builder.query({
      query: () => ({
        url: "/api/coupon",
        method: "GET",
      }),
      providesTags: ["coupon"],
    }),
    deleteCoupon: builder.mutation({
      query: (id) => ({
        url: `/api/coupon/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["coupon"],
    }),
  }),
});

export const {
  useAddUserMutation,
  useLoginUserMutation,
  useAddBikeMutation,
  useGetBikesQuery,
  useUpdateBikeMutation,
  useDeleteBikeMutation,
  useUsersMeQuery,
  useUpdateUserByAdminMutation,
  useGetAlluserByAdminQuery,
  useDeleteUserByAdminMutation,
  useUpdateUserByOwnMutation,
  useAdvancePaymentMutation,
  useGetRentalsBikeQuery,
  useClaculatePaymentMutation,
  useAddCouponMutation,
  useGetCouponQuery,
  useDeleteCouponMutation,
} = bikeApi;
