import {
  QueryObserverResult,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { useAxios } from "../../../hooks/useAxios";
import _ from "lodash";
import { useNavigate, NavigateFunction } from "react-router-dom";

interface RoleResponse {
  data: any;
}

export const useRoleTable = (): QueryObserverResult<RoleResponse, Error> => {
  const client: AxiosInstance = useAxios();
  const redirect: NavigateFunction = useNavigate();

  const queryOptions: UseQueryOptions<RoleResponse, Error> = {
    queryKey: ["role-table"],
    queryFn: async () => {
      try {
        const response = await client.get<RoleResponse>("/role");
        return response.data;
      } catch (error) {
        if (_.get(error, "response.status") === 401) {
          localStorage.removeItem("AUTH_TOKEN");
          redirect("/admin/login");
        }
        throw error;
      }
    },
  };

  return useQuery(queryOptions);
};
