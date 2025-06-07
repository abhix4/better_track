

import { getPrisma } from './db';
import { getIssues, getLastIssue } from './github';
import type { Env } from '.';

export async function cronJob(env: Env['Bindings']) {
  console.log('Running periodic cron job!')

  const prisma = getPrisma(env.DATABASE_URL!);

  const repos = await prisma.repo.findMany({
    include: {
      subscribers: true,
    },
  });

  console.log(repos);

  for (const repo of repos) {
    const issues: any = await getIssues(repo.name, repo.owner, env);
    console.log("issues --- >", issues);

    if (issues.length >= 1) {
      for (const issue of issues) {
        await prisma.notification.create({
          data: {
            title: issue.title,
            user: {
              connect: repo.subscribers.map(subscriber => ({
                id: subscriber.id,
              })),
            },
            repo: repo.name,
            owner: repo.owner,
            issueId: issue.number,
            created_at: issue.created_at,
          },
        });
      }
    }

    const lastUpdatedAt: any = await getLastIssue(repo.name, repo.owner, env);
    if (lastUpdatedAt) {
      await prisma.repo.update({
        where: {
          id: repo.id,
        },
        data: {
          lastIssueUpdatedAt: lastUpdatedAt.lastIssueUpdatedAt,
          lastIssueId: lastUpdatedAt.number,
        },
      });
    }
  }
}
