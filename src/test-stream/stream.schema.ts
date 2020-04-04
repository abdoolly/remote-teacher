import { gql } from "apollo-server";

export const streamTypeDef = gql`
enum SeatStatus {
    RELEASING
    OPEN
    RESERVED
    SELLING
    SOLD
}

type Subscription {
    onSeatReserved: SeatEvent
    onSeatSold: SeatEvent
    onSeatReleased: SeatEvent
}

type SeatEvent {
    message: String
    venueId: ID
    seatId: ID
    number: String!
    section: String
    status: SeatStatus!
    changeDate: DateTime
    data: String
}

extend type Mutation {
    reserveSeat(data: String,file: Upload): String
    releaseSeat: String
}
`;