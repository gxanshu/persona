import { ProfileCard } from '~/components/container'
import { SocialCardList } from './socialCardList'

export const SocialCard = ({ className, delay }: { className?: string; delay: number }) => {
  return (
    <ProfileCard className={`${className}`} delay={delay}>
      <div>
        <p className="mb-10 px-2.5 pt-2.5 text-xl font-semibold">
          Add your social media accounts to your Persona
        </p>
        <SocialCardList />
      </div>
    </ProfileCard>
  )
}
