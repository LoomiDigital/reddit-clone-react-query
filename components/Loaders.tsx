import React from "react";

import { ArrowUpIcon } from "@heroicons/react/24/outline";
import { ArrowDownIcon } from "@heroicons/react/24/solid";

type Props = {
  length: number;
};

export const PostLoader = ({ length }: Props) => {
  const cards = Array.from({ length }, (_, i) => i);

  return (
    <section>
      <ul className="list">
        {cards.map((index) => (
          <li key={index}>
            <div className="mb-5 flex h-full cursor-pointer rounded-md border border-gray-300  bg-white shadow-sm hover:border hover:border-gray-600">
              <div className="flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400">
                <ArrowUpIcon className="voteButtons cursor-pointer hover:text-red-400" />
                <ArrowDownIcon className="voteButtons cursor-pointer hover:text-blue-400" />
              </div>
              <div className="flex h-full w-full animate-pulse flex-row items-center justify-center space-x-5">
                <div className="w-full p-3 pb-1">
                  <div className="flex items-center space-x-2">
                    <div>
                      <div className="h-10 w-10 rounded-full bg-gray-300 "></div>
                    </div>
                    <h4 className="card-title w-3/12">
                      <div className="h-6 rounded-md bg-gray-300 "></div>
                    </h4>
                  </div>

                  <div className="py-4">
                    <div className="card-metrics">
                      <div className="h-20 rounded-md bg-gray-300 "></div>
                    </div>
                  </div>

                  <div className="space-x-4 pb-3 text-gray-400">
                    <div className="card-metrics">
                      <div className="h-6 w-6/12 rounded-md bg-gray-300"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export const CommentLoader = ({ length }: Props) => {
  const cards = Array.from({ length }, (_, i) => i);

  return (
    <section>
      <ul className="list">
        {cards.map((index) => (
          <li key={index}>
            <div className="flex h-full animate-pulse flex-row space-x-5">
              <div>
                <div className="h-10 w-10 rounded-full bg-gray-300 "></div>
              </div>
              <div className="flex grow">
                <div className="w-full p-3 pb-1">
                  <div className="flex w-52 items-center space-x-2">
                    <h4 className="card-title grow">
                      <div className="h-6 rounded-md bg-gray-300 "></div>
                    </h4>
                  </div>

                  <div className="h-max py-4">
                    <div className="card-metrics">
                      <div className="h-20 rounded-md bg-gray-300 "></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
