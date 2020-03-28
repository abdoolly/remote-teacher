// Code generated by Prisma (prisma@1.34.10). DO NOT EDIT.
// Please don't change this file manually but run `prisma generate` to update it.
// For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

import { DocumentNode } from "graphql";
import {
  makePrismaClientClass,
  BaseClientOptions,
  Model
} from "prisma-client-lib";
import { typeDefs } from "./prisma-schema";

export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
  U[keyof U];

export type Maybe<T> = T | undefined | null;

export interface Exists {
  user: (where?: UserWhereInput) => Promise<boolean>;
}

export interface Node {}

export type FragmentableArray<T> = Promise<Array<T>> & Fragmentable;

export interface Fragmentable {
  $fragment<T>(fragment: string | DocumentNode): Promise<T>;
}

export interface Prisma {
  $exists: Exists;
  $graphql: <T = any>(
    query: string,
    variables?: { [key: string]: any }
  ) => Promise<T>;

  /**
   * Queries
   */

  user: (where: UserWhereUniqueInput) => UserNullablePromise;
  users: (args?: {
    where?: UserWhereInput;
    orderBy?: UserOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => FragmentableArray<User>;
  usersConnection: (args?: {
    where?: UserWhereInput;
    orderBy?: UserOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => UserConnectionPromise;
  node: (args: { id: ID_Output }) => Node;

  /**
   * Mutations
   */

  createUser: (data: UserCreateInput) => UserPromise;
  updateUser: (args: {
    data: UserUpdateInput;
    where: UserWhereUniqueInput;
  }) => UserPromise;
  updateManyUsers: (args: {
    data: UserUpdateManyMutationInput;
    where?: UserWhereInput;
  }) => BatchPayloadPromise;
  upsertUser: (args: {
    where: UserWhereUniqueInput;
    create: UserCreateInput;
    update: UserUpdateInput;
  }) => UserPromise;
  deleteUser: (where: UserWhereUniqueInput) => UserPromise;
  deleteManyUsers: (where?: UserWhereInput) => BatchPayloadPromise;

  /**
   * Subscriptions
   */

  $subscribe: Subscription;
}

export interface Subscription {
  user: (
    where?: UserSubscriptionWhereInput
  ) => UserSubscriptionPayloadSubscription;
}

export interface ClientConstructor<T> {
  new (options?: BaseClientOptions): T;
}

/**
 * Types
 */

export type UserType = "TEACHER" | "STUDENT";

export type UserOrderByInput =
  | "_id_ASC"
  | "_id_DESC"
  | "fullName_ASC"
  | "fullName_DESC"
  | "phone_ASC"
  | "phone_DESC"
  | "userType_ASC"
  | "userType_DESC"
  | "password_ASC"
  | "password_DESC"
  | "grade_ASC"
  | "grade_DESC"
  | "createdAt_ASC"
  | "createdAt_DESC"
  | "updatedAt_ASC"
  | "updatedAt_DESC";

export type MutationType = "CREATED" | "UPDATED" | "DELETED";

export type UserWhereUniqueInput = AtLeastOne<{
  _id: Maybe<ID_Input>;
  phone?: Maybe<String>;
}>;

export interface UserWhereInput {
  _id?: Maybe<ID_Input>;
  _id_not?: Maybe<ID_Input>;
  _id_in?: Maybe<ID_Input[] | ID_Input>;
  _id_not_in?: Maybe<ID_Input[] | ID_Input>;
  _id_lt?: Maybe<ID_Input>;
  _id_lte?: Maybe<ID_Input>;
  _id_gt?: Maybe<ID_Input>;
  _id_gte?: Maybe<ID_Input>;
  _id_contains?: Maybe<ID_Input>;
  _id_not_contains?: Maybe<ID_Input>;
  _id_starts_with?: Maybe<ID_Input>;
  _id_not_starts_with?: Maybe<ID_Input>;
  _id_ends_with?: Maybe<ID_Input>;
  _id_not_ends_with?: Maybe<ID_Input>;
  fullName?: Maybe<String>;
  fullName_not?: Maybe<String>;
  fullName_in?: Maybe<String[] | String>;
  fullName_not_in?: Maybe<String[] | String>;
  fullName_lt?: Maybe<String>;
  fullName_lte?: Maybe<String>;
  fullName_gt?: Maybe<String>;
  fullName_gte?: Maybe<String>;
  fullName_contains?: Maybe<String>;
  fullName_not_contains?: Maybe<String>;
  fullName_starts_with?: Maybe<String>;
  fullName_not_starts_with?: Maybe<String>;
  fullName_ends_with?: Maybe<String>;
  fullName_not_ends_with?: Maybe<String>;
  phone?: Maybe<String>;
  phone_not?: Maybe<String>;
  phone_in?: Maybe<String[] | String>;
  phone_not_in?: Maybe<String[] | String>;
  phone_lt?: Maybe<String>;
  phone_lte?: Maybe<String>;
  phone_gt?: Maybe<String>;
  phone_gte?: Maybe<String>;
  phone_contains?: Maybe<String>;
  phone_not_contains?: Maybe<String>;
  phone_starts_with?: Maybe<String>;
  phone_not_starts_with?: Maybe<String>;
  phone_ends_with?: Maybe<String>;
  phone_not_ends_with?: Maybe<String>;
  userType?: Maybe<UserType>;
  userType_not?: Maybe<UserType>;
  userType_in?: Maybe<UserType[] | UserType>;
  userType_not_in?: Maybe<UserType[] | UserType>;
  password?: Maybe<String>;
  password_not?: Maybe<String>;
  password_in?: Maybe<String[] | String>;
  password_not_in?: Maybe<String[] | String>;
  password_lt?: Maybe<String>;
  password_lte?: Maybe<String>;
  password_gt?: Maybe<String>;
  password_gte?: Maybe<String>;
  password_contains?: Maybe<String>;
  password_not_contains?: Maybe<String>;
  password_starts_with?: Maybe<String>;
  password_not_starts_with?: Maybe<String>;
  password_ends_with?: Maybe<String>;
  password_not_ends_with?: Maybe<String>;
  grade?: Maybe<String>;
  grade_not?: Maybe<String>;
  grade_in?: Maybe<String[] | String>;
  grade_not_in?: Maybe<String[] | String>;
  grade_lt?: Maybe<String>;
  grade_lte?: Maybe<String>;
  grade_gt?: Maybe<String>;
  grade_gte?: Maybe<String>;
  grade_contains?: Maybe<String>;
  grade_not_contains?: Maybe<String>;
  grade_starts_with?: Maybe<String>;
  grade_not_starts_with?: Maybe<String>;
  grade_ends_with?: Maybe<String>;
  grade_not_ends_with?: Maybe<String>;
  subjects_some?: Maybe<SubjectWhereInput>;
  subjects_every?: Maybe<SubjectRestrictedWhereInput>;
  subjects_none?: Maybe<SubjectRestrictedWhereInput>;
  createdAt?: Maybe<DateTimeInput>;
  createdAt_not?: Maybe<DateTimeInput>;
  createdAt_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  createdAt_not_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  createdAt_lt?: Maybe<DateTimeInput>;
  createdAt_lte?: Maybe<DateTimeInput>;
  createdAt_gt?: Maybe<DateTimeInput>;
  createdAt_gte?: Maybe<DateTimeInput>;
  updatedAt?: Maybe<DateTimeInput>;
  updatedAt_not?: Maybe<DateTimeInput>;
  updatedAt_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  updatedAt_not_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  updatedAt_lt?: Maybe<DateTimeInput>;
  updatedAt_lte?: Maybe<DateTimeInput>;
  updatedAt_gt?: Maybe<DateTimeInput>;
  updatedAt_gte?: Maybe<DateTimeInput>;
  AND?: Maybe<UserWhereInput[] | UserWhereInput>;
}

export interface SubjectWhereInput {
  _id?: Maybe<ID_Input>;
  _id_not?: Maybe<ID_Input>;
  _id_in?: Maybe<ID_Input[] | ID_Input>;
  _id_not_in?: Maybe<ID_Input[] | ID_Input>;
  _id_lt?: Maybe<ID_Input>;
  _id_lte?: Maybe<ID_Input>;
  _id_gt?: Maybe<ID_Input>;
  _id_gte?: Maybe<ID_Input>;
  _id_contains?: Maybe<ID_Input>;
  _id_not_contains?: Maybe<ID_Input>;
  _id_starts_with?: Maybe<ID_Input>;
  _id_not_starts_with?: Maybe<ID_Input>;
  _id_ends_with?: Maybe<ID_Input>;
  _id_not_ends_with?: Maybe<ID_Input>;
  name?: Maybe<String>;
  name_not?: Maybe<String>;
  name_in?: Maybe<String[] | String>;
  name_not_in?: Maybe<String[] | String>;
  name_lt?: Maybe<String>;
  name_lte?: Maybe<String>;
  name_gt?: Maybe<String>;
  name_gte?: Maybe<String>;
  name_contains?: Maybe<String>;
  name_not_contains?: Maybe<String>;
  name_starts_with?: Maybe<String>;
  name_not_starts_with?: Maybe<String>;
  name_ends_with?: Maybe<String>;
  name_not_ends_with?: Maybe<String>;
  photoUrl?: Maybe<String>;
  photoUrl_not?: Maybe<String>;
  photoUrl_in?: Maybe<String[] | String>;
  photoUrl_not_in?: Maybe<String[] | String>;
  photoUrl_lt?: Maybe<String>;
  photoUrl_lte?: Maybe<String>;
  photoUrl_gt?: Maybe<String>;
  photoUrl_gte?: Maybe<String>;
  photoUrl_contains?: Maybe<String>;
  photoUrl_not_contains?: Maybe<String>;
  photoUrl_starts_with?: Maybe<String>;
  photoUrl_not_starts_with?: Maybe<String>;
  photoUrl_ends_with?: Maybe<String>;
  photoUrl_not_ends_with?: Maybe<String>;
  grade?: Maybe<String>;
  grade_not?: Maybe<String>;
  grade_in?: Maybe<String[] | String>;
  grade_not_in?: Maybe<String[] | String>;
  grade_lt?: Maybe<String>;
  grade_lte?: Maybe<String>;
  grade_gt?: Maybe<String>;
  grade_gte?: Maybe<String>;
  grade_contains?: Maybe<String>;
  grade_not_contains?: Maybe<String>;
  grade_starts_with?: Maybe<String>;
  grade_not_starts_with?: Maybe<String>;
  grade_ends_with?: Maybe<String>;
  grade_not_ends_with?: Maybe<String>;
  AND?: Maybe<SubjectWhereInput[] | SubjectWhereInput>;
}

export interface SubjectRestrictedWhereInput {
  _id?: Maybe<ID_Input>;
  _id_not?: Maybe<ID_Input>;
  _id_in?: Maybe<ID_Input[] | ID_Input>;
  _id_not_in?: Maybe<ID_Input[] | ID_Input>;
  _id_lt?: Maybe<ID_Input>;
  _id_lte?: Maybe<ID_Input>;
  _id_gt?: Maybe<ID_Input>;
  _id_gte?: Maybe<ID_Input>;
  _id_contains?: Maybe<ID_Input>;
  _id_not_contains?: Maybe<ID_Input>;
  _id_starts_with?: Maybe<ID_Input>;
  _id_not_starts_with?: Maybe<ID_Input>;
  _id_ends_with?: Maybe<ID_Input>;
  _id_not_ends_with?: Maybe<ID_Input>;
  name?: Maybe<String>;
  name_not?: Maybe<String>;
  name_in?: Maybe<String[] | String>;
  name_not_in?: Maybe<String[] | String>;
  name_lt?: Maybe<String>;
  name_lte?: Maybe<String>;
  name_gt?: Maybe<String>;
  name_gte?: Maybe<String>;
  name_contains?: Maybe<String>;
  name_not_contains?: Maybe<String>;
  name_starts_with?: Maybe<String>;
  name_not_starts_with?: Maybe<String>;
  name_ends_with?: Maybe<String>;
  name_not_ends_with?: Maybe<String>;
  photoUrl?: Maybe<String>;
  photoUrl_not?: Maybe<String>;
  photoUrl_in?: Maybe<String[] | String>;
  photoUrl_not_in?: Maybe<String[] | String>;
  photoUrl_lt?: Maybe<String>;
  photoUrl_lte?: Maybe<String>;
  photoUrl_gt?: Maybe<String>;
  photoUrl_gte?: Maybe<String>;
  photoUrl_contains?: Maybe<String>;
  photoUrl_not_contains?: Maybe<String>;
  photoUrl_starts_with?: Maybe<String>;
  photoUrl_not_starts_with?: Maybe<String>;
  photoUrl_ends_with?: Maybe<String>;
  photoUrl_not_ends_with?: Maybe<String>;
  grade?: Maybe<String>;
  grade_not?: Maybe<String>;
  grade_in?: Maybe<String[] | String>;
  grade_not_in?: Maybe<String[] | String>;
  grade_lt?: Maybe<String>;
  grade_lte?: Maybe<String>;
  grade_gt?: Maybe<String>;
  grade_gte?: Maybe<String>;
  grade_contains?: Maybe<String>;
  grade_not_contains?: Maybe<String>;
  grade_starts_with?: Maybe<String>;
  grade_not_starts_with?: Maybe<String>;
  grade_ends_with?: Maybe<String>;
  grade_not_ends_with?: Maybe<String>;
  AND?: Maybe<SubjectRestrictedWhereInput[] | SubjectRestrictedWhereInput>;
}

export interface UserCreateInput {
  _id?: Maybe<ID_Input>;
  fullName?: Maybe<String>;
  phone: String;
  userType?: Maybe<UserType>;
  password?: Maybe<String>;
  grade?: Maybe<String>;
  subjects?: Maybe<SubjectCreateManyInput>;
}

export interface SubjectCreateManyInput {
  create?: Maybe<SubjectCreateInput[] | SubjectCreateInput>;
}

export interface SubjectCreateInput {
  _id?: Maybe<ID_Input>;
  name: String;
  photoUrl?: Maybe<String>;
  grade?: Maybe<String>;
}

export interface UserUpdateInput {
  fullName?: Maybe<String>;
  phone?: Maybe<String>;
  userType?: Maybe<UserType>;
  password?: Maybe<String>;
  grade?: Maybe<String>;
  subjects?: Maybe<SubjectUpdateManyInput>;
}

export interface SubjectUpdateManyInput {
  create?: Maybe<SubjectCreateInput[] | SubjectCreateInput>;
  update?: Maybe<
    | SubjectUpdateWithWhereUniqueNestedInput[]
    | SubjectUpdateWithWhereUniqueNestedInput
  >;
  upsert?: Maybe<
    | SubjectUpsertWithWhereUniqueNestedInput[]
    | SubjectUpsertWithWhereUniqueNestedInput
  >;
  delete?: Maybe<SubjectWhereUniqueInput[] | SubjectWhereUniqueInput>;
  deleteMany?: Maybe<SubjectScalarWhereInput[] | SubjectScalarWhereInput>;
  updateMany?: Maybe<
    | SubjectUpdateManyWithWhereNestedInput[]
    | SubjectUpdateManyWithWhereNestedInput
  >;
}

export interface SubjectUpdateWithWhereUniqueNestedInput {
  where: SubjectWhereUniqueInput;
  data: SubjectUpdateDataInput;
}

export type SubjectWhereUniqueInput = AtLeastOne<{
  _id: Maybe<ID_Input>;
}>;

export interface SubjectUpdateDataInput {
  name?: Maybe<String>;
  photoUrl?: Maybe<String>;
  grade?: Maybe<String>;
}

export interface SubjectUpsertWithWhereUniqueNestedInput {
  where: SubjectWhereUniqueInput;
  update: SubjectUpdateDataInput;
  create: SubjectCreateInput;
}

export interface SubjectScalarWhereInput {
  _id?: Maybe<ID_Input>;
  _id_not?: Maybe<ID_Input>;
  _id_in?: Maybe<ID_Input[] | ID_Input>;
  _id_not_in?: Maybe<ID_Input[] | ID_Input>;
  _id_lt?: Maybe<ID_Input>;
  _id_lte?: Maybe<ID_Input>;
  _id_gt?: Maybe<ID_Input>;
  _id_gte?: Maybe<ID_Input>;
  _id_contains?: Maybe<ID_Input>;
  _id_not_contains?: Maybe<ID_Input>;
  _id_starts_with?: Maybe<ID_Input>;
  _id_not_starts_with?: Maybe<ID_Input>;
  _id_ends_with?: Maybe<ID_Input>;
  _id_not_ends_with?: Maybe<ID_Input>;
  name?: Maybe<String>;
  name_not?: Maybe<String>;
  name_in?: Maybe<String[] | String>;
  name_not_in?: Maybe<String[] | String>;
  name_lt?: Maybe<String>;
  name_lte?: Maybe<String>;
  name_gt?: Maybe<String>;
  name_gte?: Maybe<String>;
  name_contains?: Maybe<String>;
  name_not_contains?: Maybe<String>;
  name_starts_with?: Maybe<String>;
  name_not_starts_with?: Maybe<String>;
  name_ends_with?: Maybe<String>;
  name_not_ends_with?: Maybe<String>;
  photoUrl?: Maybe<String>;
  photoUrl_not?: Maybe<String>;
  photoUrl_in?: Maybe<String[] | String>;
  photoUrl_not_in?: Maybe<String[] | String>;
  photoUrl_lt?: Maybe<String>;
  photoUrl_lte?: Maybe<String>;
  photoUrl_gt?: Maybe<String>;
  photoUrl_gte?: Maybe<String>;
  photoUrl_contains?: Maybe<String>;
  photoUrl_not_contains?: Maybe<String>;
  photoUrl_starts_with?: Maybe<String>;
  photoUrl_not_starts_with?: Maybe<String>;
  photoUrl_ends_with?: Maybe<String>;
  photoUrl_not_ends_with?: Maybe<String>;
  grade?: Maybe<String>;
  grade_not?: Maybe<String>;
  grade_in?: Maybe<String[] | String>;
  grade_not_in?: Maybe<String[] | String>;
  grade_lt?: Maybe<String>;
  grade_lte?: Maybe<String>;
  grade_gt?: Maybe<String>;
  grade_gte?: Maybe<String>;
  grade_contains?: Maybe<String>;
  grade_not_contains?: Maybe<String>;
  grade_starts_with?: Maybe<String>;
  grade_not_starts_with?: Maybe<String>;
  grade_ends_with?: Maybe<String>;
  grade_not_ends_with?: Maybe<String>;
  AND?: Maybe<SubjectScalarWhereInput[] | SubjectScalarWhereInput>;
  OR?: Maybe<SubjectScalarWhereInput[] | SubjectScalarWhereInput>;
  NOT?: Maybe<SubjectScalarWhereInput[] | SubjectScalarWhereInput>;
}

export interface SubjectUpdateManyWithWhereNestedInput {
  where: SubjectScalarWhereInput;
  data: SubjectUpdateManyDataInput;
}

export interface SubjectUpdateManyDataInput {
  name?: Maybe<String>;
  photoUrl?: Maybe<String>;
  grade?: Maybe<String>;
}

export interface UserUpdateManyMutationInput {
  fullName?: Maybe<String>;
  phone?: Maybe<String>;
  userType?: Maybe<UserType>;
  password?: Maybe<String>;
  grade?: Maybe<String>;
}

export interface UserSubscriptionWhereInput {
  mutation_in?: Maybe<MutationType[] | MutationType>;
  updatedFields_contains?: Maybe<String>;
  updatedFields_contains_every?: Maybe<String[] | String>;
  updatedFields_contains_some?: Maybe<String[] | String>;
  node?: Maybe<UserWhereInput>;
  AND?: Maybe<UserSubscriptionWhereInput[] | UserSubscriptionWhereInput>;
}

export interface NodeNode {
  id: ID_Output;
}

export interface User {
  _id: ID_Output;
  fullName?: String;
  phone: String;
  userType?: UserType;
  password?: String;
  grade?: String;
  subjects?: <T = FragmentableArray<Subject>>() => T;
  createdAt: DateTimeOutput;
  updatedAt: DateTimeOutput;
}

export interface UserPromise extends Promise<User>, Fragmentable {
  _id: () => Promise<ID_Output>;
  fullName: () => Promise<String>;
  phone: () => Promise<String>;
  userType: () => Promise<UserType>;
  password: () => Promise<String>;
  grade: () => Promise<String>;
  subjects: <T = FragmentableArray<Subject>>() => T;
  createdAt: () => Promise<DateTimeOutput>;
  updatedAt: () => Promise<DateTimeOutput>;
}

export interface UserSubscription
  extends Promise<AsyncIterator<User>>,
    Fragmentable {
  _id: () => Promise<AsyncIterator<ID_Output>>;
  fullName: () => Promise<AsyncIterator<String>>;
  phone: () => Promise<AsyncIterator<String>>;
  userType: () => Promise<AsyncIterator<UserType>>;
  password: () => Promise<AsyncIterator<String>>;
  grade: () => Promise<AsyncIterator<String>>;
  subjects: <T = Promise<AsyncIterator<SubjectSubscription>>>() => T;
  createdAt: () => Promise<AsyncIterator<DateTimeOutput>>;
  updatedAt: () => Promise<AsyncIterator<DateTimeOutput>>;
}

export interface UserNullablePromise
  extends Promise<User | null>,
    Fragmentable {
  _id: () => Promise<ID_Output>;
  fullName: () => Promise<String>;
  phone: () => Promise<String>;
  userType: () => Promise<UserType>;
  password: () => Promise<String>;
  grade: () => Promise<String>;
  subjects: <T = FragmentableArray<Subject>>() => T;
  createdAt: () => Promise<DateTimeOutput>;
  updatedAt: () => Promise<DateTimeOutput>;
}

export interface Subject {
  _id: ID_Output;
  name: String;
  photoUrl?: String;
  grade?: String;
}

export interface SubjectPromise extends Promise<Subject>, Fragmentable {
  _id: () => Promise<ID_Output>;
  name: () => Promise<String>;
  photoUrl: () => Promise<String>;
  grade: () => Promise<String>;
}

export interface SubjectSubscription
  extends Promise<AsyncIterator<Subject>>,
    Fragmentable {
  _id: () => Promise<AsyncIterator<ID_Output>>;
  name: () => Promise<AsyncIterator<String>>;
  photoUrl: () => Promise<AsyncIterator<String>>;
  grade: () => Promise<AsyncIterator<String>>;
}

export interface SubjectNullablePromise
  extends Promise<Subject | null>,
    Fragmentable {
  _id: () => Promise<ID_Output>;
  name: () => Promise<String>;
  photoUrl: () => Promise<String>;
  grade: () => Promise<String>;
}

export interface UserConnection {
  pageInfo: PageInfo;
  edges: UserEdge[];
}

export interface UserConnectionPromise
  extends Promise<UserConnection>,
    Fragmentable {
  pageInfo: <T = PageInfoPromise>() => T;
  edges: <T = FragmentableArray<UserEdge>>() => T;
  aggregate: <T = AggregateUserPromise>() => T;
}

export interface UserConnectionSubscription
  extends Promise<AsyncIterator<UserConnection>>,
    Fragmentable {
  pageInfo: <T = PageInfoSubscription>() => T;
  edges: <T = Promise<AsyncIterator<UserEdgeSubscription>>>() => T;
  aggregate: <T = AggregateUserSubscription>() => T;
}

export interface PageInfo {
  hasNextPage: Boolean;
  hasPreviousPage: Boolean;
  startCursor?: String;
  endCursor?: String;
}

export interface PageInfoPromise extends Promise<PageInfo>, Fragmentable {
  hasNextPage: () => Promise<Boolean>;
  hasPreviousPage: () => Promise<Boolean>;
  startCursor: () => Promise<String>;
  endCursor: () => Promise<String>;
}

export interface PageInfoSubscription
  extends Promise<AsyncIterator<PageInfo>>,
    Fragmentable {
  hasNextPage: () => Promise<AsyncIterator<Boolean>>;
  hasPreviousPage: () => Promise<AsyncIterator<Boolean>>;
  startCursor: () => Promise<AsyncIterator<String>>;
  endCursor: () => Promise<AsyncIterator<String>>;
}

export interface UserEdge {
  node: User;
  cursor: String;
}

export interface UserEdgePromise extends Promise<UserEdge>, Fragmentable {
  node: <T = UserPromise>() => T;
  cursor: () => Promise<String>;
}

export interface UserEdgeSubscription
  extends Promise<AsyncIterator<UserEdge>>,
    Fragmentable {
  node: <T = UserSubscription>() => T;
  cursor: () => Promise<AsyncIterator<String>>;
}

export interface AggregateUser {
  count: Int;
}

export interface AggregateUserPromise
  extends Promise<AggregateUser>,
    Fragmentable {
  count: () => Promise<Int>;
}

export interface AggregateUserSubscription
  extends Promise<AsyncIterator<AggregateUser>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Int>>;
}

export interface BatchPayload {
  count: Long;
}

export interface BatchPayloadPromise
  extends Promise<BatchPayload>,
    Fragmentable {
  count: () => Promise<Long>;
}

export interface BatchPayloadSubscription
  extends Promise<AsyncIterator<BatchPayload>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Long>>;
}

export interface UserSubscriptionPayload {
  mutation: MutationType;
  node: User;
  updatedFields: String[];
  previousValues: UserPreviousValues;
}

export interface UserSubscriptionPayloadPromise
  extends Promise<UserSubscriptionPayload>,
    Fragmentable {
  mutation: () => Promise<MutationType>;
  node: <T = UserPromise>() => T;
  updatedFields: () => Promise<String[]>;
  previousValues: <T = UserPreviousValuesPromise>() => T;
}

export interface UserSubscriptionPayloadSubscription
  extends Promise<AsyncIterator<UserSubscriptionPayload>>,
    Fragmentable {
  mutation: () => Promise<AsyncIterator<MutationType>>;
  node: <T = UserSubscription>() => T;
  updatedFields: () => Promise<AsyncIterator<String[]>>;
  previousValues: <T = UserPreviousValuesSubscription>() => T;
}

export interface UserPreviousValues {
  _id: ID_Output;
  fullName?: String;
  phone: String;
  userType?: UserType;
  password?: String;
  grade?: String;
  createdAt: DateTimeOutput;
  updatedAt: DateTimeOutput;
}

export interface UserPreviousValuesPromise
  extends Promise<UserPreviousValues>,
    Fragmentable {
  _id: () => Promise<ID_Output>;
  fullName: () => Promise<String>;
  phone: () => Promise<String>;
  userType: () => Promise<UserType>;
  password: () => Promise<String>;
  grade: () => Promise<String>;
  createdAt: () => Promise<DateTimeOutput>;
  updatedAt: () => Promise<DateTimeOutput>;
}

export interface UserPreviousValuesSubscription
  extends Promise<AsyncIterator<UserPreviousValues>>,
    Fragmentable {
  _id: () => Promise<AsyncIterator<ID_Output>>;
  fullName: () => Promise<AsyncIterator<String>>;
  phone: () => Promise<AsyncIterator<String>>;
  userType: () => Promise<AsyncIterator<UserType>>;
  password: () => Promise<AsyncIterator<String>>;
  grade: () => Promise<AsyncIterator<String>>;
  createdAt: () => Promise<AsyncIterator<DateTimeOutput>>;
  updatedAt: () => Promise<AsyncIterator<DateTimeOutput>>;
}

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number;
export type ID_Output = string;

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string;

/*
DateTime scalar input type, allowing Date
*/
export type DateTimeInput = Date | string;

/*
DateTime scalar output type, which is always a string
*/
export type DateTimeOutput = string;

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.
*/
export type Int = number;

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean;

export type Long = string;

/**
 * Model Metadata
 */

export const models: Model[] = [
  {
    name: "UserType",
    embedded: false
  },
  {
    name: "Subject",
    embedded: true
  },
  {
    name: "User",
    embedded: false
  }
];

/**
 * Type Defs
 */

export const Prisma = makePrismaClientClass<ClientConstructor<Prisma>>({
  typeDefs,
  models,
  endpoint: `http://localhost:4466`
});
export const prisma = new Prisma();
