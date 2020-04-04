import { SchemaDirectiveVisitor } from "apollo-server";
import { defaultFieldResolver, GraphQLString } from "graphql";
import moment from 'moment';

export class DateFormatDirective extends SchemaDirectiveVisitor {

    validator(field: any) {
        const { resolve = defaultFieldResolver } = field;
        const { format } = this.args;
        field.resolve = async function (...args) {
            const date = await resolve.apply(this, args);
            return moment(date).format(format);
        };

        // The formatted Date becomes a String, so the field type must change:
        field.type = GraphQLString;
    }

    visitFieldDefinition(field: any) {
        this.validator(field);
    }

    visitInputFieldDefinition(field) {

    }
}