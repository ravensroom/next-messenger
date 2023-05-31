'use client';

import { FullConversationType } from '@/app/types';
import { User, Message, Conversation } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import clsx from 'clsx';
import { format } from 'date-fns';
import useOtherUser from '@/app/hooks/useOtherUser';
import Avatar from '@/app/components/Avatar';

interface ConversationBoxProps {
  data: FullConversationType;
  selected?: boolean;
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
  data,
  selected,
}) => {
  const otherUser = useOtherUser(data);
  const session = useSession();
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data.id, router]);

  const lastMessage = useMemo(() => {
    const messages = data.messages;
    return messages.length ? messages.at(-1) : null;
  }, [data.messages]);

  const userEmail = useMemo(() => {
    return session?.data?.user?.email;
  }, [session?.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) return false;
    const seenArray = lastMessage.seen || [];
    if (!userEmail) return false;
    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [userEmail, lastMessage]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) return 'Sent an image';
    if (lastMessage?.body) return lastMessage.body;
    return 'Started a new conversation';
  }, [lastMessage]);

  return (
    <div
      onClick={handleClick}
      className={clsx(
        `
          w-full 
          relative 
          flex 
          items-center 
          space-x-3 
          bg-white 
          p-3 
          hover:bg-neutral-100
          rounded-lg
          transition
          cursor-pointer
        `,
        selected ? 'bg-neutral-100' : 'bg-white'
      )}
    >
      <Avatar user={otherUser} />
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm font-medium text-gray-900">
              {data.name || otherUser.name}
            </p>
            {true && (
              <p className="text-xs text-gray-400 font-light">
                {format(new Date(), 'p')}
              </p>
            )}
          </div>
          <p
            className={clsx(
              'truncate text-xs',
              hasSeen ? 'text-gray-400' : 'text-gray-600 font-medium'
            )}
          >
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;