import { Document, Schema, Model, model } from 'mongoose';
import { BookletCategoriesEnum, BookletCitiesEnum } from '@/data/enums/booklet';
import { BookletInputTypesEnum, BookletTaskStatusesEnum } from '@schemas/index';
import type { Booklet } from '@schemas/index';
interface IBooklet extends Document, Booklet {
  createdAt: Date;
  updatedAt: Date;
}

const bookletSchema: Schema<IBooklet> = new Schema(
  {
    bookletType: {
      type: String,
      enum: ['internal', 'external'],
      required: true,
    },
    category: {
      type: String,
      enum: Object.values(BookletCategoriesEnum),
      required: true,
    },
    projectName: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    bookletNumber: {
      type: String,
      required: true,
    },
    issueDate: {
      type: String,
      required: true,
    },
    issueCity: {
      type: String,
      enum: Object.values(BookletCitiesEnum),
      required: true,
    },
    bookletTasks: [
      {
        name: {
          type: [{ type: String }],
          required: true,
        },
        inputName: {
          type: String,
          required: true,
        },
        data: {
          type: Schema.Types.Mixed,
          default: null,
        },
        tableData: {
          type: Schema.Types.Mixed,
          default: null,
        },
        status: {
          type: String,
          enum: Object.values(BookletTaskStatusesEnum),
          required: true,
          default: 'Pending',
        },
        type: {
          type: String,
          required: true,
          default: 'Add',
        },
        inputType: {
          type: String,
          enum: Object.values(BookletInputTypesEnum),
          required: true,
          default: 'Text',
        },
        description: {
          type: [{ type: String }],
          required: true,
        },
        pageNumber: {
          type: Number,
          required: true,
        }
      }
    ]
  },
  {
    timestamps: true,
  }
);

const Booklets: Model<IBooklet> = model<IBooklet>('Booklets', bookletSchema);

export default Booklets;
