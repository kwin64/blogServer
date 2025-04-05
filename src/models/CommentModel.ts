import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface IComment {
  id?: string;
  content: string;
  commentatorInfo: {
    userId: string;
    userLogin: string;
  };
  likesInfo: {
    likesCount: number;
    dislikesCount: number;
    myStatus: 'None' | 'Like' | 'Dislike';
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface ICommentWithPagination {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: IComment[];
}

export interface CommentDocument extends Document {
  _id: Types.ObjectId;
  content: string;
  postId: Types.ObjectId;
  commentatorInfo: {
    userId: Types.ObjectId;
    userLogin: string;
  };
  likesInfo: {
    likesCount: number;
    dislikesCount: number;
    myStatus: 'None' | 'Like' | 'Dislike';
  };
  createdAt?: Date;
  updatedAt?: Date;
}

const CommentSchema: Schema<CommentDocument> = new Schema(
  {
    content: { type: String, required: true },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    commentatorInfo: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      userLogin: {
        type: String,
        required: true,
      },
    },
    likesInfo: {
      likesCount: Number,
      dislikesCount: Number,
      myStatus: String,
    },
  },
  { timestamps: true }
);
const Comment: Model<CommentDocument> = mongoose.model<CommentDocument>(
  'Comments',
  CommentSchema
);
export default Comment;
