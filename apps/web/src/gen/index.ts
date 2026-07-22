export type { CreateAssignmentMutationKey } from "./hooks/assignments/useCreateAssignment";
export type { ListAssignmentsQueryKey } from "./hooks/assignments/useListAssignments";
export type { UpdateAssignmentStatusMutationKey } from "./hooks/assignments/useUpdateAssignmentStatus";
export type { CreateCitizenMutationKey } from "./hooks/citizens/useCreateCitizen";
export type { DeleteCitizenMutationKey } from "./hooks/citizens/useDeleteCitizen";
export type { GetCitizenQueryKey } from "./hooks/citizens/useGetCitizen";
export type { ListCitizensQueryKey } from "./hooks/citizens/useListCitizens";
export type { UpdateCitizenMutationKey } from "./hooks/citizens/useUpdateCitizen";
export type { GetDashboardMetricsQueryKey } from "./hooks/dashboard/useGetDashboardMetrics";
export type { GetCityQueryKey } from "./hooks/geo/useGetCity";
export type { GetNeighborhoodQueryKey } from "./hooks/geo/useGetNeighborhood";
export type { ListCitiesQueryKey } from "./hooks/geo/useListCities";
export type { ListNeighborhoodsQueryKey } from "./hooks/geo/useListNeighborhoods";
export type { CreateOccurrenceTypeMutationKey } from "./hooks/occurrenceTypes/useCreateOccurrenceType";
export type { DeleteOccurrenceTypeMutationKey } from "./hooks/occurrenceTypes/useDeleteOccurrenceType";
export type { GetOccurrenceTypeQueryKey } from "./hooks/occurrenceTypes/useGetOccurrenceType";
export type { ListOccurrenceTypesQueryKey } from "./hooks/occurrenceTypes/useListOccurrenceTypes";
export type { UpdateOccurrenceTypeMutationKey } from "./hooks/occurrenceTypes/useUpdateOccurrenceType";
export type { CloseOccurrenceMutationKey } from "./hooks/occurrences/useCloseOccurrence";
export type { CreateOccurrenceMutationKey } from "./hooks/occurrences/useCreateOccurrence";
export type { DeleteOccurrenceMutationKey } from "./hooks/occurrences/useDeleteOccurrence";
export type { GetOccurrenceQueryKey } from "./hooks/occurrences/useGetOccurrence";
export type { ListOccurrencesQueryKey } from "./hooks/occurrences/useListOccurrences";
export type { UpdateOccurrenceMutationKey } from "./hooks/occurrences/useUpdateOccurrence";
export type { CreateTimelineEventMutationKey } from "./hooks/timeline/useCreateTimelineEvent";
export type { ListTimelineQueryKey } from "./hooks/timeline/useListTimeline";
export type { GetMeQueryKey } from "./hooks/users/useGetMe";
export type { ListAgentsQueryKey } from "./hooks/users/useListAgents";
export type { ListUsersQueryKey } from "./hooks/users/useListUsers";
export type { CreateVehicleMutationKey } from "./hooks/vehicles/useCreateVehicle";
export type { GetLatestVehicleLocationQueryKey } from "./hooks/vehicles/useGetLatestVehicleLocation";
export type { GetVehicleQueryKey } from "./hooks/vehicles/useGetVehicle";
export type { ListVehiclesQueryKey } from "./hooks/vehicles/useListVehicles";
export type { ReportVehicleLocationMutationKey } from "./hooks/vehicles/useReportVehicleLocation";
export type { SetVehicleStatusMutationKey } from "./hooks/vehicles/useSetVehicleStatus";
export type { UpdateVehicleMutationKey } from "./hooks/vehicles/useUpdateVehicle";
export type { Assignment } from "./types/Assignment";
export type { AssignmentInput } from "./types/AssignmentInput";
export type {
	AssignmentStatus,
	AssignmentStatusEnumKey,
} from "./types/AssignmentStatus";
export type {
	AssignmentStatusInput,
	AssignmentStatusInputEnumKey,
} from "./types/AssignmentStatusInput";
export type { AssignmentWithResources } from "./types/AssignmentWithResources";
export type { AssignmentWithResourcesInput } from "./types/AssignmentWithResourcesInput";
export type { Citizen } from "./types/Citizen";
export type { CitizenInput } from "./types/CitizenInput";
export type { City } from "./types/City";
export type { CityInput } from "./types/CityInput";
export type { CreateAssignment } from "./types/CreateAssignment";
export type { CreateAssignmentInput } from "./types/CreateAssignmentInput";
export type { CreateCitizen } from "./types/CreateCitizen";
export type { CreateCitizenInput } from "./types/CreateCitizenInput";
export type { CreateOccurrence } from "./types/CreateOccurrence";
export type { CreateOccurrenceInput } from "./types/CreateOccurrenceInput";
export type { CreateOccurrenceType } from "./types/CreateOccurrenceType";
export type { CreateOccurrenceTypeInput } from "./types/CreateOccurrenceTypeInput";
export type { CreateTimelineEvent } from "./types/CreateTimelineEvent";
export type { CreateTimelineEventInput } from "./types/CreateTimelineEventInput";
export type { CreateVehicle } from "./types/CreateVehicle";
export type { CreateVehicleInput } from "./types/CreateVehicleInput";
export type { ErrorResponse } from "./types/ErrorResponse";
export type { ErrorResponseInput } from "./types/ErrorResponseInput";
export type { Neighborhood } from "./types/Neighborhood";
export type { NeighborhoodInput } from "./types/NeighborhoodInput";
export type { OccurrenceDetail } from "./types/OccurrenceDetail";
export type { OccurrenceDetailInput } from "./types/OccurrenceDetailInput";
export type {
	OccurrencePriority,
	OccurrencePriorityEnumKey,
} from "./types/OccurrencePriority";
export type {
	OccurrencePriorityInput,
	OccurrencePriorityInputEnumKey,
} from "./types/OccurrencePriorityInput";
export type {
	OccurrenceStatus,
	OccurrenceStatusEnumKey,
} from "./types/OccurrenceStatus";
export type {
	OccurrenceStatusInput,
	OccurrenceStatusInputEnumKey,
} from "./types/OccurrenceStatusInput";
export type { OccurrenceSummary } from "./types/OccurrenceSummary";
export type { OccurrenceSummaryInput } from "./types/OccurrenceSummaryInput";
export type { OccurrenceType } from "./types/OccurrenceType";
export type { OccurrenceTypeInput } from "./types/OccurrenceTypeInput";
export type { PublicUser } from "./types/PublicUser";
export type { PublicUserInput } from "./types/PublicUserInput";
export type { Role, RoleEnumKey } from "./types/Role";
export type { RoleInput, RoleInputEnumKey } from "./types/RoleInput";
export type { TimelineEvent } from "./types/TimelineEvent";
export type { TimelineEventInput } from "./types/TimelineEventInput";
export type {
	TimelineEventType,
	TimelineEventTypeEnumKey,
} from "./types/TimelineEventType";
export type {
	TimelineEventTypeInput,
	TimelineEventTypeInputEnumKey,
} from "./types/TimelineEventTypeInput";
export type { UpdateAssignmentStatus } from "./types/UpdateAssignmentStatus";
export type { UpdateAssignmentStatusInput } from "./types/UpdateAssignmentStatusInput";
export type { UpdateCitizen } from "./types/UpdateCitizen";
export type { UpdateCitizenInput } from "./types/UpdateCitizenInput";
export type { UpdateOccurrence } from "./types/UpdateOccurrence";
export type { UpdateOccurrenceInput } from "./types/UpdateOccurrenceInput";
export type { UpdateOccurrenceType } from "./types/UpdateOccurrenceType";
export type { UpdateOccurrenceTypeInput } from "./types/UpdateOccurrenceTypeInput";
export type { UpdateVehicle } from "./types/UpdateVehicle";
export type { UpdateVehicleInput } from "./types/UpdateVehicleInput";
export type { UserRef } from "./types/UserRef";
export type { UserRefInput } from "./types/UserRefInput";
export type { Vehicle } from "./types/Vehicle";
export type { VehicleInput } from "./types/VehicleInput";
export type { VehicleLocation } from "./types/VehicleLocation";
export type { VehicleLocationInput } from "./types/VehicleLocationInput";
export type {
	VehicleStatus,
	VehicleStatusEnumKey,
} from "./types/VehicleStatus";
export type {
	VehicleStatusInput,
	VehicleStatusInputEnumKey,
} from "./types/VehicleStatusInput";
export type {
	CreateAssignment201,
	CreateAssignmentMutation,
	CreateAssignmentMutationRequest,
	CreateAssignmentMutationResponse,
	CreateAssignmentPathParams,
} from "./types/assignments/CreateAssignment";
export type {
	ListAssignments200,
	ListAssignmentsPathParams,
	ListAssignmentsQuery,
	ListAssignmentsQueryResponse,
} from "./types/assignments/ListAssignments";
export type {
	UpdateAssignmentStatus200,
	UpdateAssignmentStatus404,
	UpdateAssignmentStatusMutation,
	UpdateAssignmentStatusMutationRequest,
	UpdateAssignmentStatusMutationResponse,
	UpdateAssignmentStatusPathParams,
} from "./types/assignments/UpdateAssignmentStatus";
export type {
	CreateCitizen201,
	CreateCitizen409,
	CreateCitizenMutation,
	CreateCitizenMutationRequest,
	CreateCitizenMutationResponse,
} from "./types/citizens/CreateCitizen";
export type {
	DeleteCitizen204,
	DeleteCitizen204EnumKey,
	DeleteCitizen404,
	DeleteCitizenMutation,
	DeleteCitizenMutationResponse,
	DeleteCitizenPathParams,
} from "./types/citizens/DeleteCitizen";
export type {
	GetCitizen200,
	GetCitizen404,
	GetCitizenPathParams,
	GetCitizenQuery,
	GetCitizenQueryResponse,
} from "./types/citizens/GetCitizen";
export type {
	ListCitizens200,
	ListCitizensQuery,
	ListCitizensQueryParams,
	ListCitizensQueryParamsIsActiveEnumKey,
	ListCitizensQueryResponse,
} from "./types/citizens/ListCitizens";
export type {
	UpdateCitizen200,
	UpdateCitizen404,
	UpdateCitizenMutation,
	UpdateCitizenMutationRequest,
	UpdateCitizenMutationResponse,
	UpdateCitizenPathParams,
} from "./types/citizens/UpdateCitizen";
export type {
	GetDashboardMetrics200,
	GetDashboardMetricsQuery,
	GetDashboardMetricsQueryResponse,
} from "./types/dashboard/GetDashboardMetrics";
export type {
	GetCity200,
	GetCity404,
	GetCityPathParams,
	GetCityQuery,
	GetCityQueryResponse,
} from "./types/geo/GetCity";
export type {
	GetNeighborhood200,
	GetNeighborhood404,
	GetNeighborhoodPathParams,
	GetNeighborhoodQuery,
	GetNeighborhoodQueryResponse,
} from "./types/geo/GetNeighborhood";
export type {
	ListCities200,
	ListCitiesQuery,
	ListCitiesQueryResponse,
} from "./types/geo/ListCities";
export type {
	ListNeighborhoods200,
	ListNeighborhoodsQuery,
	ListNeighborhoodsQueryParams,
	ListNeighborhoodsQueryResponse,
} from "./types/geo/ListNeighborhoods";
export type {
	CreateOccurrenceType201,
	CreateOccurrenceType409,
	CreateOccurrenceTypeMutation,
	CreateOccurrenceTypeMutationRequest,
	CreateOccurrenceTypeMutationResponse,
} from "./types/occurrenceTypes/CreateOccurrenceType";
export type {
	DeleteOccurrenceType204,
	DeleteOccurrenceType204EnumKey,
	DeleteOccurrenceType404,
	DeleteOccurrenceTypeMutation,
	DeleteOccurrenceTypeMutationResponse,
	DeleteOccurrenceTypePathParams,
} from "./types/occurrenceTypes/DeleteOccurrenceType";
export type {
	GetOccurrenceType200,
	GetOccurrenceType404,
	GetOccurrenceTypePathParams,
	GetOccurrenceTypeQuery,
	GetOccurrenceTypeQueryResponse,
} from "./types/occurrenceTypes/GetOccurrenceType";
export type {
	ListOccurrenceTypes200,
	ListOccurrenceTypesQuery,
	ListOccurrenceTypesQueryParams,
	ListOccurrenceTypesQueryParamsActiveOnlyEnumKey,
	ListOccurrenceTypesQueryResponse,
} from "./types/occurrenceTypes/ListOccurrenceTypes";
export type {
	UpdateOccurrenceType200,
	UpdateOccurrenceType404,
	UpdateOccurrenceTypeMutation,
	UpdateOccurrenceTypeMutationRequest,
	UpdateOccurrenceTypeMutationResponse,
	UpdateOccurrenceTypePathParams,
} from "./types/occurrenceTypes/UpdateOccurrenceType";
export type {
	CloseOccurrence200,
	CloseOccurrence404,
	CloseOccurrenceMutation,
	CloseOccurrenceMutationResponse,
	CloseOccurrencePathParams,
} from "./types/occurrences/CloseOccurrence";
export type {
	CreateOccurrence201,
	CreateOccurrence409,
	CreateOccurrenceMutation,
	CreateOccurrenceMutationRequest,
	CreateOccurrenceMutationResponse,
} from "./types/occurrences/CreateOccurrence";
export type {
	DeleteOccurrence204,
	DeleteOccurrence204EnumKey,
	DeleteOccurrence404,
	DeleteOccurrenceMutation,
	DeleteOccurrenceMutationResponse,
	DeleteOccurrencePathParams,
} from "./types/occurrences/DeleteOccurrence";
export type {
	GetOccurrence200,
	GetOccurrence404,
	GetOccurrencePathParams,
	GetOccurrenceQuery,
	GetOccurrenceQueryResponse,
} from "./types/occurrences/GetOccurrence";
export type {
	ListOccurrences200,
	ListOccurrencesQuery,
	ListOccurrencesQueryParams,
	ListOccurrencesQueryParamsMineEnumKey,
	ListOccurrencesQueryResponse,
} from "./types/occurrences/ListOccurrences";
export type {
	UpdateOccurrence200,
	UpdateOccurrence404,
	UpdateOccurrenceMutation,
	UpdateOccurrenceMutationRequest,
	UpdateOccurrenceMutationResponse,
	UpdateOccurrencePathParams,
} from "./types/occurrences/UpdateOccurrence";
export type {
	CreateTimelineEvent201,
	CreateTimelineEventMutation,
	CreateTimelineEventMutationRequest,
	CreateTimelineEventMutationResponse,
	CreateTimelineEventPathParams,
} from "./types/timeline/CreateTimelineEvent";
export type {
	ListTimeline200,
	ListTimelinePathParams,
	ListTimelineQuery,
	ListTimelineQueryResponse,
} from "./types/timeline/ListTimeline";
export type {
	GetMe200,
	GetMe401,
	GetMeQuery,
	GetMeQueryResponse,
} from "./types/users/GetMe";
export type {
	ListAgents200,
	ListAgentsQuery,
	ListAgentsQueryResponse,
} from "./types/users/ListAgents";
export type {
	ListUsers200,
	ListUsersQuery,
	ListUsersQueryParams,
	ListUsersQueryResponse,
} from "./types/users/ListUsers";
export type {
	CreateVehicle201,
	CreateVehicle409,
	CreateVehicleMutation,
	CreateVehicleMutationRequest,
	CreateVehicleMutationResponse,
} from "./types/vehicles/CreateVehicle";
export type {
	GetLatestVehicleLocation200,
	GetLatestVehicleLocation404,
	GetLatestVehicleLocationPathParams,
	GetLatestVehicleLocationQuery,
	GetLatestVehicleLocationQueryResponse,
} from "./types/vehicles/GetLatestVehicleLocation";
export type {
	GetVehicle200,
	GetVehicle404,
	GetVehiclePathParams,
	GetVehicleQuery,
	GetVehicleQueryResponse,
} from "./types/vehicles/GetVehicle";
export type {
	ListVehicles200,
	ListVehiclesQuery,
	ListVehiclesQueryParams,
	ListVehiclesQueryResponse,
} from "./types/vehicles/ListVehicles";
export type {
	ReportVehicleLocation201,
	ReportVehicleLocation404,
	ReportVehicleLocationMutation,
	ReportVehicleLocationMutationRequest,
	ReportVehicleLocationMutationResponse,
	ReportVehicleLocationPathParams,
} from "./types/vehicles/ReportVehicleLocation";
export type {
	SetVehicleStatus200,
	SetVehicleStatus404,
	SetVehicleStatusMutation,
	SetVehicleStatusMutationRequest,
	SetVehicleStatusMutationResponse,
	SetVehicleStatusPathParams,
} from "./types/vehicles/SetVehicleStatus";
export type {
	UpdateVehicle200,
	UpdateVehicle404,
	UpdateVehicleMutation,
	UpdateVehicleMutationRequest,
	UpdateVehicleMutationResponse,
	UpdateVehiclePathParams,
} from "./types/vehicles/UpdateVehicle";
export { assignments } from "./clients/assignments/assignments";
export { createAssignment } from "./clients/assignments/createAssignment";
export { listAssignments } from "./clients/assignments/listAssignments";
export { updateAssignmentStatus } from "./clients/assignments/updateAssignmentStatus";
export { citizens } from "./clients/citizens/citizens";
export { createCitizen } from "./clients/citizens/createCitizen";
export { deleteCitizen } from "./clients/citizens/deleteCitizen";
export { getCitizen } from "./clients/citizens/getCitizen";
export { listCitizens } from "./clients/citizens/listCitizens";
export { updateCitizen } from "./clients/citizens/updateCitizen";
export { dashboard } from "./clients/dashboard/dashboard";
export { getDashboardMetrics } from "./clients/dashboard/getDashboardMetrics";
export { geo } from "./clients/geo/geo";
export { getCity } from "./clients/geo/getCity";
export { getNeighborhood } from "./clients/geo/getNeighborhood";
export { listCities } from "./clients/geo/listCities";
export { listNeighborhoods } from "./clients/geo/listNeighborhoods";
export { createOccurrenceType } from "./clients/occurrenceTypes/createOccurrenceType";
export { deleteOccurrenceType } from "./clients/occurrenceTypes/deleteOccurrenceType";
export { getOccurrenceType } from "./clients/occurrenceTypes/getOccurrenceType";
export { listOccurrenceTypes } from "./clients/occurrenceTypes/listOccurrenceTypes";
export { occurrenceTypes } from "./clients/occurrenceTypes/occurrenceTypes";
export { updateOccurrenceType } from "./clients/occurrenceTypes/updateOccurrenceType";
export { closeOccurrence } from "./clients/occurrences/closeOccurrence";
export { createOccurrence } from "./clients/occurrences/createOccurrence";
export { deleteOccurrence } from "./clients/occurrences/deleteOccurrence";
export { getOccurrence } from "./clients/occurrences/getOccurrence";
export { listOccurrences } from "./clients/occurrences/listOccurrences";
export { occurrences } from "./clients/occurrences/occurrences";
export { updateOccurrence } from "./clients/occurrences/updateOccurrence";
export { createTimelineEvent } from "./clients/timeline/createTimelineEvent";
export { listTimeline } from "./clients/timeline/listTimeline";
export { timeline } from "./clients/timeline/timeline";
export { getMe } from "./clients/users/getMe";
export { listAgents } from "./clients/users/listAgents";
export { listUsers } from "./clients/users/listUsers";
export { users } from "./clients/users/users";
export { createVehicle } from "./clients/vehicles/createVehicle";
export { getLatestVehicleLocation } from "./clients/vehicles/getLatestVehicleLocation";
export { getVehicle } from "./clients/vehicles/getVehicle";
export { listVehicles } from "./clients/vehicles/listVehicles";
export { reportVehicleLocation } from "./clients/vehicles/reportVehicleLocation";
export { setVehicleStatus } from "./clients/vehicles/setVehicleStatus";
export { updateVehicle } from "./clients/vehicles/updateVehicle";
export { vehicles } from "./clients/vehicles/vehicles";
export { createAssignmentMutationKey } from "./hooks/assignments/useCreateAssignment";
export { createAssignmentMutationOptions } from "./hooks/assignments/useCreateAssignment";
export { useCreateAssignment } from "./hooks/assignments/useCreateAssignment";
export { listAssignmentsQueryKey } from "./hooks/assignments/useListAssignments";
export { listAssignmentsQueryOptions } from "./hooks/assignments/useListAssignments";
export { useListAssignments } from "./hooks/assignments/useListAssignments";
export { updateAssignmentStatusMutationKey } from "./hooks/assignments/useUpdateAssignmentStatus";
export { updateAssignmentStatusMutationOptions } from "./hooks/assignments/useUpdateAssignmentStatus";
export { useUpdateAssignmentStatus } from "./hooks/assignments/useUpdateAssignmentStatus";
export { createCitizenMutationKey } from "./hooks/citizens/useCreateCitizen";
export { createCitizenMutationOptions } from "./hooks/citizens/useCreateCitizen";
export { useCreateCitizen } from "./hooks/citizens/useCreateCitizen";
export { deleteCitizenMutationKey } from "./hooks/citizens/useDeleteCitizen";
export { deleteCitizenMutationOptions } from "./hooks/citizens/useDeleteCitizen";
export { useDeleteCitizen } from "./hooks/citizens/useDeleteCitizen";
export { getCitizenQueryKey } from "./hooks/citizens/useGetCitizen";
export { getCitizenQueryOptions } from "./hooks/citizens/useGetCitizen";
export { useGetCitizen } from "./hooks/citizens/useGetCitizen";
export { listCitizensQueryKey } from "./hooks/citizens/useListCitizens";
export { listCitizensQueryOptions } from "./hooks/citizens/useListCitizens";
export { useListCitizens } from "./hooks/citizens/useListCitizens";
export { updateCitizenMutationKey } from "./hooks/citizens/useUpdateCitizen";
export { updateCitizenMutationOptions } from "./hooks/citizens/useUpdateCitizen";
export { useUpdateCitizen } from "./hooks/citizens/useUpdateCitizen";
export { getDashboardMetricsQueryKey } from "./hooks/dashboard/useGetDashboardMetrics";
export { getDashboardMetricsQueryOptions } from "./hooks/dashboard/useGetDashboardMetrics";
export { useGetDashboardMetrics } from "./hooks/dashboard/useGetDashboardMetrics";
export { getCityQueryKey } from "./hooks/geo/useGetCity";
export { getCityQueryOptions } from "./hooks/geo/useGetCity";
export { useGetCity } from "./hooks/geo/useGetCity";
export { getNeighborhoodQueryKey } from "./hooks/geo/useGetNeighborhood";
export { getNeighborhoodQueryOptions } from "./hooks/geo/useGetNeighborhood";
export { useGetNeighborhood } from "./hooks/geo/useGetNeighborhood";
export { listCitiesQueryKey } from "./hooks/geo/useListCities";
export { listCitiesQueryOptions } from "./hooks/geo/useListCities";
export { useListCities } from "./hooks/geo/useListCities";
export { listNeighborhoodsQueryKey } from "./hooks/geo/useListNeighborhoods";
export { listNeighborhoodsQueryOptions } from "./hooks/geo/useListNeighborhoods";
export { useListNeighborhoods } from "./hooks/geo/useListNeighborhoods";
export { createOccurrenceTypeMutationKey } from "./hooks/occurrenceTypes/useCreateOccurrenceType";
export { createOccurrenceTypeMutationOptions } from "./hooks/occurrenceTypes/useCreateOccurrenceType";
export { useCreateOccurrenceType } from "./hooks/occurrenceTypes/useCreateOccurrenceType";
export { deleteOccurrenceTypeMutationKey } from "./hooks/occurrenceTypes/useDeleteOccurrenceType";
export { deleteOccurrenceTypeMutationOptions } from "./hooks/occurrenceTypes/useDeleteOccurrenceType";
export { useDeleteOccurrenceType } from "./hooks/occurrenceTypes/useDeleteOccurrenceType";
export { getOccurrenceTypeQueryKey } from "./hooks/occurrenceTypes/useGetOccurrenceType";
export { getOccurrenceTypeQueryOptions } from "./hooks/occurrenceTypes/useGetOccurrenceType";
export { useGetOccurrenceType } from "./hooks/occurrenceTypes/useGetOccurrenceType";
export { listOccurrenceTypesQueryKey } from "./hooks/occurrenceTypes/useListOccurrenceTypes";
export { listOccurrenceTypesQueryOptions } from "./hooks/occurrenceTypes/useListOccurrenceTypes";
export { useListOccurrenceTypes } from "./hooks/occurrenceTypes/useListOccurrenceTypes";
export { updateOccurrenceTypeMutationKey } from "./hooks/occurrenceTypes/useUpdateOccurrenceType";
export { updateOccurrenceTypeMutationOptions } from "./hooks/occurrenceTypes/useUpdateOccurrenceType";
export { useUpdateOccurrenceType } from "./hooks/occurrenceTypes/useUpdateOccurrenceType";
export { closeOccurrenceMutationKey } from "./hooks/occurrences/useCloseOccurrence";
export { closeOccurrenceMutationOptions } from "./hooks/occurrences/useCloseOccurrence";
export { useCloseOccurrence } from "./hooks/occurrences/useCloseOccurrence";
export { createOccurrenceMutationKey } from "./hooks/occurrences/useCreateOccurrence";
export { createOccurrenceMutationOptions } from "./hooks/occurrences/useCreateOccurrence";
export { useCreateOccurrence } from "./hooks/occurrences/useCreateOccurrence";
export { deleteOccurrenceMutationKey } from "./hooks/occurrences/useDeleteOccurrence";
export { deleteOccurrenceMutationOptions } from "./hooks/occurrences/useDeleteOccurrence";
export { useDeleteOccurrence } from "./hooks/occurrences/useDeleteOccurrence";
export { getOccurrenceQueryKey } from "./hooks/occurrences/useGetOccurrence";
export { getOccurrenceQueryOptions } from "./hooks/occurrences/useGetOccurrence";
export { useGetOccurrence } from "./hooks/occurrences/useGetOccurrence";
export { listOccurrencesQueryKey } from "./hooks/occurrences/useListOccurrences";
export { listOccurrencesQueryOptions } from "./hooks/occurrences/useListOccurrences";
export { useListOccurrences } from "./hooks/occurrences/useListOccurrences";
export { updateOccurrenceMutationKey } from "./hooks/occurrences/useUpdateOccurrence";
export { updateOccurrenceMutationOptions } from "./hooks/occurrences/useUpdateOccurrence";
export { useUpdateOccurrence } from "./hooks/occurrences/useUpdateOccurrence";
export { createTimelineEventMutationKey } from "./hooks/timeline/useCreateTimelineEvent";
export { createTimelineEventMutationOptions } from "./hooks/timeline/useCreateTimelineEvent";
export { useCreateTimelineEvent } from "./hooks/timeline/useCreateTimelineEvent";
export { listTimelineQueryKey } from "./hooks/timeline/useListTimeline";
export { listTimelineQueryOptions } from "./hooks/timeline/useListTimeline";
export { useListTimeline } from "./hooks/timeline/useListTimeline";
export { getMeQueryKey } from "./hooks/users/useGetMe";
export { getMeQueryOptions } from "./hooks/users/useGetMe";
export { useGetMe } from "./hooks/users/useGetMe";
export { listAgentsQueryKey } from "./hooks/users/useListAgents";
export { listAgentsQueryOptions } from "./hooks/users/useListAgents";
export { useListAgents } from "./hooks/users/useListAgents";
export { listUsersQueryKey } from "./hooks/users/useListUsers";
export { listUsersQueryOptions } from "./hooks/users/useListUsers";
export { useListUsers } from "./hooks/users/useListUsers";
export { createVehicleMutationKey } from "./hooks/vehicles/useCreateVehicle";
export { createVehicleMutationOptions } from "./hooks/vehicles/useCreateVehicle";
export { useCreateVehicle } from "./hooks/vehicles/useCreateVehicle";
export { getLatestVehicleLocationQueryKey } from "./hooks/vehicles/useGetLatestVehicleLocation";
export { getLatestVehicleLocationQueryOptions } from "./hooks/vehicles/useGetLatestVehicleLocation";
export { useGetLatestVehicleLocation } from "./hooks/vehicles/useGetLatestVehicleLocation";
export { getVehicleQueryKey } from "./hooks/vehicles/useGetVehicle";
export { getVehicleQueryOptions } from "./hooks/vehicles/useGetVehicle";
export { useGetVehicle } from "./hooks/vehicles/useGetVehicle";
export { listVehiclesQueryKey } from "./hooks/vehicles/useListVehicles";
export { listVehiclesQueryOptions } from "./hooks/vehicles/useListVehicles";
export { useListVehicles } from "./hooks/vehicles/useListVehicles";
export { reportVehicleLocationMutationKey } from "./hooks/vehicles/useReportVehicleLocation";
export { reportVehicleLocationMutationOptions } from "./hooks/vehicles/useReportVehicleLocation";
export { useReportVehicleLocation } from "./hooks/vehicles/useReportVehicleLocation";
export { setVehicleStatusMutationKey } from "./hooks/vehicles/useSetVehicleStatus";
export { setVehicleStatusMutationOptions } from "./hooks/vehicles/useSetVehicleStatus";
export { useSetVehicleStatus } from "./hooks/vehicles/useSetVehicleStatus";
export { updateVehicleMutationKey } from "./hooks/vehicles/useUpdateVehicle";
export { updateVehicleMutationOptions } from "./hooks/vehicles/useUpdateVehicle";
export { useUpdateVehicle } from "./hooks/vehicles/useUpdateVehicle";
export { assignmentInputSchema } from "./schemas/assignmentInputSchema";
export { assignmentSchema } from "./schemas/assignmentSchema";
export { assignmentStatusInputSchema } from "./schemas/assignmentStatusInputSchema";
export { assignmentStatusSchema } from "./schemas/assignmentStatusSchema";
export { assignmentWithResourcesInputSchema } from "./schemas/assignmentWithResourcesInputSchema";
export { assignmentWithResourcesSchema } from "./schemas/assignmentWithResourcesSchema";
export {
	createAssignment201Schema,
	createAssignmentMutationRequestSchema,
	createAssignmentMutationResponseSchema,
	createAssignmentPathParamsSchema,
} from "./schemas/assignments/createAssignmentSchema";
export {
	listAssignments200Schema,
	listAssignmentsPathParamsSchema,
	listAssignmentsQueryResponseSchema,
} from "./schemas/assignments/listAssignmentsSchema";
export {
	updateAssignmentStatus200Schema,
	updateAssignmentStatus404Schema,
	updateAssignmentStatusMutationRequestSchema,
	updateAssignmentStatusMutationResponseSchema,
	updateAssignmentStatusPathParamsSchema,
} from "./schemas/assignments/updateAssignmentStatusSchema";
export { citizenInputSchema } from "./schemas/citizenInputSchema";
export { citizenSchema } from "./schemas/citizenSchema";
export {
	createCitizen201Schema,
	createCitizen409Schema,
	createCitizenMutationRequestSchema,
	createCitizenMutationResponseSchema,
} from "./schemas/citizens/createCitizenSchema";
export {
	deleteCitizen204Schema,
	deleteCitizen404Schema,
	deleteCitizenMutationResponseSchema,
	deleteCitizenPathParamsSchema,
} from "./schemas/citizens/deleteCitizenSchema";
export {
	getCitizen200Schema,
	getCitizen404Schema,
	getCitizenPathParamsSchema,
	getCitizenQueryResponseSchema,
} from "./schemas/citizens/getCitizenSchema";
export {
	listCitizens200Schema,
	listCitizensQueryParamsSchema,
	listCitizensQueryResponseSchema,
} from "./schemas/citizens/listCitizensSchema";
export {
	updateCitizen200Schema,
	updateCitizen404Schema,
	updateCitizenMutationRequestSchema,
	updateCitizenMutationResponseSchema,
	updateCitizenPathParamsSchema,
} from "./schemas/citizens/updateCitizenSchema";
export { cityInputSchema } from "./schemas/cityInputSchema";
export { citySchema } from "./schemas/citySchema";
export { createAssignmentInputSchema } from "./schemas/createAssignmentInputSchema";
export { createAssignmentSchema } from "./schemas/createAssignmentSchema";
export { createCitizenInputSchema } from "./schemas/createCitizenInputSchema";
export { createCitizenSchema } from "./schemas/createCitizenSchema";
export { createOccurrenceInputSchema } from "./schemas/createOccurrenceInputSchema";
export { createOccurrenceSchema } from "./schemas/createOccurrenceSchema";
export { createOccurrenceTypeInputSchema } from "./schemas/createOccurrenceTypeInputSchema";
export { createOccurrenceTypeSchema } from "./schemas/createOccurrenceTypeSchema";
export { createTimelineEventInputSchema } from "./schemas/createTimelineEventInputSchema";
export { createTimelineEventSchema } from "./schemas/createTimelineEventSchema";
export { createVehicleInputSchema } from "./schemas/createVehicleInputSchema";
export { createVehicleSchema } from "./schemas/createVehicleSchema";
export {
	getDashboardMetrics200Schema,
	getDashboardMetricsQueryResponseSchema,
} from "./schemas/dashboard/getDashboardMetricsSchema";
export { errorResponseInputSchema } from "./schemas/errorResponseInputSchema";
export { errorResponseSchema } from "./schemas/errorResponseSchema";
export {
	getCity200Schema,
	getCity404Schema,
	getCityPathParamsSchema,
	getCityQueryResponseSchema,
} from "./schemas/geo/getCitySchema";
export {
	getNeighborhood200Schema,
	getNeighborhood404Schema,
	getNeighborhoodPathParamsSchema,
	getNeighborhoodQueryResponseSchema,
} from "./schemas/geo/getNeighborhoodSchema";
export {
	listCities200Schema,
	listCitiesQueryResponseSchema,
} from "./schemas/geo/listCitiesSchema";
export {
	listNeighborhoods200Schema,
	listNeighborhoodsQueryParamsSchema,
	listNeighborhoodsQueryResponseSchema,
} from "./schemas/geo/listNeighborhoodsSchema";
export { neighborhoodInputSchema } from "./schemas/neighborhoodInputSchema";
export { neighborhoodSchema } from "./schemas/neighborhoodSchema";
export { occurrenceDetailInputSchema } from "./schemas/occurrenceDetailInputSchema";
export { occurrenceDetailSchema } from "./schemas/occurrenceDetailSchema";
export { occurrencePriorityInputSchema } from "./schemas/occurrencePriorityInputSchema";
export { occurrencePrioritySchema } from "./schemas/occurrencePrioritySchema";
export { occurrenceStatusInputSchema } from "./schemas/occurrenceStatusInputSchema";
export { occurrenceStatusSchema } from "./schemas/occurrenceStatusSchema";
export { occurrenceSummaryInputSchema } from "./schemas/occurrenceSummaryInputSchema";
export { occurrenceSummarySchema } from "./schemas/occurrenceSummarySchema";
export { occurrenceTypeInputSchema } from "./schemas/occurrenceTypeInputSchema";
export { occurrenceTypeSchema } from "./schemas/occurrenceTypeSchema";
export {
	createOccurrenceType201Schema,
	createOccurrenceType409Schema,
	createOccurrenceTypeMutationRequestSchema,
	createOccurrenceTypeMutationResponseSchema,
} from "./schemas/occurrenceTypes/createOccurrenceTypeSchema";
export {
	deleteOccurrenceType204Schema,
	deleteOccurrenceType404Schema,
	deleteOccurrenceTypeMutationResponseSchema,
	deleteOccurrenceTypePathParamsSchema,
} from "./schemas/occurrenceTypes/deleteOccurrenceTypeSchema";
export {
	getOccurrenceType200Schema,
	getOccurrenceType404Schema,
	getOccurrenceTypePathParamsSchema,
	getOccurrenceTypeQueryResponseSchema,
} from "./schemas/occurrenceTypes/getOccurrenceTypeSchema";
export {
	listOccurrenceTypes200Schema,
	listOccurrenceTypesQueryParamsSchema,
	listOccurrenceTypesQueryResponseSchema,
} from "./schemas/occurrenceTypes/listOccurrenceTypesSchema";
export {
	updateOccurrenceType200Schema,
	updateOccurrenceType404Schema,
	updateOccurrenceTypeMutationRequestSchema,
	updateOccurrenceTypeMutationResponseSchema,
	updateOccurrenceTypePathParamsSchema,
} from "./schemas/occurrenceTypes/updateOccurrenceTypeSchema";
export {
	closeOccurrence200Schema,
	closeOccurrence404Schema,
	closeOccurrenceMutationResponseSchema,
	closeOccurrencePathParamsSchema,
} from "./schemas/occurrences/closeOccurrenceSchema";
export {
	createOccurrence201Schema,
	createOccurrence409Schema,
	createOccurrenceMutationRequestSchema,
	createOccurrenceMutationResponseSchema,
} from "./schemas/occurrences/createOccurrenceSchema";
export {
	deleteOccurrence204Schema,
	deleteOccurrence404Schema,
	deleteOccurrenceMutationResponseSchema,
	deleteOccurrencePathParamsSchema,
} from "./schemas/occurrences/deleteOccurrenceSchema";
export {
	getOccurrence200Schema,
	getOccurrence404Schema,
	getOccurrencePathParamsSchema,
	getOccurrenceQueryResponseSchema,
} from "./schemas/occurrences/getOccurrenceSchema";
export {
	listOccurrences200Schema,
	listOccurrencesQueryParamsSchema,
	listOccurrencesQueryResponseSchema,
} from "./schemas/occurrences/listOccurrencesSchema";
export {
	updateOccurrence200Schema,
	updateOccurrence404Schema,
	updateOccurrenceMutationRequestSchema,
	updateOccurrenceMutationResponseSchema,
	updateOccurrencePathParamsSchema,
} from "./schemas/occurrences/updateOccurrenceSchema";
export { publicUserInputSchema } from "./schemas/publicUserInputSchema";
export { publicUserSchema } from "./schemas/publicUserSchema";
export { roleInputSchema } from "./schemas/roleInputSchema";
export { roleSchema } from "./schemas/roleSchema";
export {
	createTimelineEvent201Schema,
	createTimelineEventMutationRequestSchema,
	createTimelineEventMutationResponseSchema,
	createTimelineEventPathParamsSchema,
} from "./schemas/timeline/createTimelineEventSchema";
export {
	listTimeline200Schema,
	listTimelinePathParamsSchema,
	listTimelineQueryResponseSchema,
} from "./schemas/timeline/listTimelineSchema";
export { timelineEventInputSchema } from "./schemas/timelineEventInputSchema";
export { timelineEventSchema } from "./schemas/timelineEventSchema";
export { timelineEventTypeInputSchema } from "./schemas/timelineEventTypeInputSchema";
export { timelineEventTypeSchema } from "./schemas/timelineEventTypeSchema";
export { updateAssignmentStatusInputSchema } from "./schemas/updateAssignmentStatusInputSchema";
export { updateAssignmentStatusSchema } from "./schemas/updateAssignmentStatusSchema";
export { updateCitizenInputSchema } from "./schemas/updateCitizenInputSchema";
export { updateCitizenSchema } from "./schemas/updateCitizenSchema";
export { updateOccurrenceInputSchema } from "./schemas/updateOccurrenceInputSchema";
export { updateOccurrenceSchema } from "./schemas/updateOccurrenceSchema";
export { updateOccurrenceTypeInputSchema } from "./schemas/updateOccurrenceTypeInputSchema";
export { updateOccurrenceTypeSchema } from "./schemas/updateOccurrenceTypeSchema";
export { updateVehicleInputSchema } from "./schemas/updateVehicleInputSchema";
export { updateVehicleSchema } from "./schemas/updateVehicleSchema";
export { userRefInputSchema } from "./schemas/userRefInputSchema";
export { userRefSchema } from "./schemas/userRefSchema";
export {
	getMe200Schema,
	getMe401Schema,
	getMeQueryResponseSchema,
} from "./schemas/users/getMeSchema";
export {
	listAgents200Schema,
	listAgentsQueryResponseSchema,
} from "./schemas/users/listAgentsSchema";
export {
	listUsers200Schema,
	listUsersQueryParamsSchema,
	listUsersQueryResponseSchema,
} from "./schemas/users/listUsersSchema";
export { vehicleInputSchema } from "./schemas/vehicleInputSchema";
export { vehicleLocationInputSchema } from "./schemas/vehicleLocationInputSchema";
export { vehicleLocationSchema } from "./schemas/vehicleLocationSchema";
export { vehicleSchema } from "./schemas/vehicleSchema";
export { vehicleStatusInputSchema } from "./schemas/vehicleStatusInputSchema";
export { vehicleStatusSchema } from "./schemas/vehicleStatusSchema";
export {
	createVehicle201Schema,
	createVehicle409Schema,
	createVehicleMutationRequestSchema,
	createVehicleMutationResponseSchema,
} from "./schemas/vehicles/createVehicleSchema";
export {
	getLatestVehicleLocation200Schema,
	getLatestVehicleLocation404Schema,
	getLatestVehicleLocationPathParamsSchema,
	getLatestVehicleLocationQueryResponseSchema,
} from "./schemas/vehicles/getLatestVehicleLocationSchema";
export {
	getVehicle200Schema,
	getVehicle404Schema,
	getVehiclePathParamsSchema,
	getVehicleQueryResponseSchema,
} from "./schemas/vehicles/getVehicleSchema";
export {
	listVehicles200Schema,
	listVehiclesQueryParamsSchema,
	listVehiclesQueryResponseSchema,
} from "./schemas/vehicles/listVehiclesSchema";
export {
	reportVehicleLocation201Schema,
	reportVehicleLocation404Schema,
	reportVehicleLocationMutationRequestSchema,
	reportVehicleLocationMutationResponseSchema,
	reportVehicleLocationPathParamsSchema,
} from "./schemas/vehicles/reportVehicleLocationSchema";
export {
	setVehicleStatus200Schema,
	setVehicleStatus404Schema,
	setVehicleStatusMutationRequestSchema,
	setVehicleStatusMutationResponseSchema,
	setVehicleStatusPathParamsSchema,
} from "./schemas/vehicles/setVehicleStatusSchema";
export {
	updateVehicle200Schema,
	updateVehicle404Schema,
	updateVehicleMutationRequestSchema,
	updateVehicleMutationResponseSchema,
	updateVehiclePathParamsSchema,
} from "./schemas/vehicles/updateVehicleSchema";
export { assignmentStatusEnum } from "./types/AssignmentStatus";
export { assignmentStatusInputEnum } from "./types/AssignmentStatusInput";
export { occurrencePriorityEnum } from "./types/OccurrencePriority";
export { occurrencePriorityInputEnum } from "./types/OccurrencePriorityInput";
export { occurrenceStatusEnum } from "./types/OccurrenceStatus";
export { occurrenceStatusInputEnum } from "./types/OccurrenceStatusInput";
export { roleEnum } from "./types/Role";
export { roleInputEnum } from "./types/RoleInput";
export { timelineEventTypeEnum } from "./types/TimelineEventType";
export { timelineEventTypeInputEnum } from "./types/TimelineEventTypeInput";
export { vehicleStatusEnum } from "./types/VehicleStatus";
export { vehicleStatusInputEnum } from "./types/VehicleStatusInput";
export { listCitizensQueryParamsIsActiveEnum } from "./types/citizens/ListCitizens";
export { listOccurrenceTypesQueryParamsActiveOnlyEnum } from "./types/occurrenceTypes/ListOccurrenceTypes";
export { listOccurrencesQueryParamsMineEnum } from "./types/occurrences/ListOccurrences";
