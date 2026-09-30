-- Seed initial Healthora articles and podcasts
INSERT INTO "articles" ("title","slug","description","content","image","category","reading_time") VALUES ('10 Best Exercises for Beginners','10-best-exercises-for-beginners','Starting a fitness journey does not have to be complicated. Beginners can build strength, flexibility and endurance with simple exercises performed regularly. 1. Walking Walking is...','
            <p>
                Starting a fitness journey does not have to be complicated.
                Beginners can build strength, flexibility and endurance with
                simple exercises performed regularly.
            </p>

            <h3>1. Walking</h3>
            <p>
                Walking is one of the easiest ways to improve cardiovascular
                fitness. Start with 20 to 30 minutes and gradually increase
                your duration.
            </p>

            <h3>2. Bodyweight Squats</h3>
            <p>
                Squats help strengthen the legs and improve lower-body
                mobility. Perform the movement in a controlled way.
            </p>

            <h3>3. Push-Ups</h3>
            <p>
                Push-ups work the chest, shoulders and arms. Beginners can
                start with modified push-ups and gradually progress.
            </p>

            <h3>4. Lunges</h3>
            <p>
                Lunges help improve leg strength and balance. Perform each
                repetition slowly while maintaining good posture.
            </p>

            <h3>5. Plank</h3>
            <p>
                Planks strengthen the core. Start with a comfortable duration
                and gradually increase it as your core becomes stronger.
            </p>

            <h3>6. Glute Bridge</h3>
            <p>
                Glute bridges target the hips and glutes and can be performed
                without equipment.
            </p>

            <h3>7. Step-Ups</h3>
            <p>
                Step-ups are useful for strengthening the legs and improving
                balance.
            </p>

            <h3>8. Jumping Jacks</h3>
            <p>
                Jumping jacks are a simple full-body movement that can be
                included in a beginner cardio routine.
            </p>

            <h3>9. Bird Dog</h3>
            <p>
                Bird dog exercises help improve core stability and coordination.
            </p>

            <h3>10. Stretching</h3>
            <p>
                Finish your workout with gentle stretching and controlled
                breathing.
            </p>

            <h3>Beginner Tip</h3>
            <p>
                Focus on consistency and proper technique instead of exercising
                at maximum intensity.
            </p>
        ','src/assets/fitness.png','Fitness','8 min read') ON CONFLICT ("slug") DO NOTHING;
--> statement-breakpoint
INSERT INTO "articles" ("title","slug","description","content","image","category","reading_time") VALUES ('How to Build a Balanced Diet','how-to-build-a-balanced-diet','A balanced diet provides your body with the nutrients it needs for energy, growth and everyday health. Include Protein Include protein-rich foods such as eggs, beans, lentils, dair...','
            <p>
                A balanced diet provides your body with the nutrients it needs
                for energy, growth and everyday health.
            </p>

            <h3>Include Protein</h3>
            <p>
                Include protein-rich foods such as eggs, beans, lentils,
                dairy products, fish or other suitable protein sources.
            </p>

            <h3>Add Vegetables and Fruits</h3>
            <p>
                Vegetables and fruits provide important vitamins, minerals
                and dietary fibre. Try to include a variety of colours in
                your meals.
            </p>

            <h3>Choose Healthy Carbohydrates</h3>
            <p>
                Whole grains, oats, brown rice and other minimally processed
                carbohydrate sources can provide useful energy.
            </p>

            <h3>Include Healthy Fats</h3>
            <p>
                Nuts, seeds, avocado and suitable plant oils can be included
                as sources of healthy fats.
            </p>

            <h3>Drink Enough Water</h3>
            <p>
                Staying hydrated is an important part of maintaining a
                healthy daily routine.
            </p>

            <h3>Build Balanced Meals</h3>
            <p>
                Try combining protein, vegetables or fruits, carbohydrates
                and healthy fats to create satisfying meals.
            </p>
        ','src/assets/nutrition.png','Nutrition','7 min read') ON CONFLICT ("slug") DO NOTHING;
--> statement-breakpoint
INSERT INTO "articles" ("title","slug","description","content","image","category","reading_time") VALUES ('How to Manage Stress Naturally','how-to-manage-stress-naturally','Everyday stress can affect concentration, sleep and overall well-being. Simple habits may help you manage everyday stress. 1. Practice Deep Breathing Slow, controlled breathing can...','
            <p>
                Everyday stress can affect concentration, sleep and overall
                well-being. Simple habits may help you manage everyday stress.
            </p>

            <h3>1. Practice Deep Breathing</h3>
            <p>
                Slow, controlled breathing can help you pause and relax during
                stressful moments.
            </p>

            <h3>2. Stay Physically Active</h3>
            <p>
                Walking, stretching or regular exercise can become a useful
                part of a healthy stress-management routine.
            </p>

            <h3>3. Take Short Breaks</h3>
            <p>
                Taking short breaks during study or work can help prevent
                mental fatigue.
            </p>

            <h3>4. Get Enough Sleep</h3>
            <p>
                Maintaining a consistent sleep routine is an important part
                of supporting mental well-being.
            </p>

            <h3>5. Practice Mindfulness</h3>
            <p>
                Mindfulness can help you focus on the present moment instead
                of continuously thinking about stressful situations.
            </p>

            <h3>6. Stay Connected</h3>
            <p>
                Talking with trusted friends, family members or other
                supportive people can help you feel less isolated.
            </p>
        ','src/assets/meditation.png','Mental Health','7 min read') ON CONFLICT ("slug") DO NOTHING;
--> statement-breakpoint
INSERT INTO "articles" ("title","slug","description","content","image","category","reading_time") VALUES ('Beginner''s Guide to Morning Yoga','beginner-s-guide-to-morning-yoga','Morning yoga can be a simple way to start the day with gentle movement, stretching and mindful breathing. 1. Comfortable Breathing Begin by sitting or standing comfortably and taki...','
            <p>
                Morning yoga can be a simple way to start the day with gentle
                movement, stretching and mindful breathing.
            </p>

            <h3>1. Comfortable Breathing</h3>
            <p>
                Begin by sitting or standing comfortably and taking a few
                slow, controlled breaths.
            </p>

            <h3>2. Neck and Shoulder Movement</h3>
            <p>
                Gentle neck and shoulder movements can help you loosen up
                after sleeping.
            </p>

            <h3>3. Cat-Cow Stretch</h3>
            <p>
                Cat-cow movements provide gentle movement for the spine and
                can be included in a beginner routine.
            </p>

            <h3>4. Child''s Pose</h3>
            <p>
                Child''s pose is a gentle resting position that can be used
                between movements.
            </p>

            <h3>5. Downward-Facing Dog</h3>
            <p>
                This pose provides a full-body stretch and can be practiced
                gradually according to your comfort.
            </p>

            <h3>6. Gentle Forward Fold</h3>
            <p>
                A gentle forward fold can be used as part of a morning
                stretching routine.
            </p>

            <h3>Morning Tip</h3>
            <p>
                Move slowly and never force a stretch. Focus on comfortable
                movement and breathing.
            </p>
        ','src/assets/Yoga.png','General','8 min read') ON CONFLICT ("slug") DO NOTHING;
--> statement-breakpoint
INSERT INTO "articles" ("title","slug","description","content","image","category","reading_time") VALUES ('Small Habits That Improve Your Day','small-habits-that-improve-your-day','Small daily habits can make it easier to maintain a healthy and organized lifestyle. Start Your Day With Water Drinking water can be a simple way to begin your morning routine. Mov...','
            <p>
                Small daily habits can make it easier to maintain a healthy
                and organized lifestyle.
            </p>

            <h3>Start Your Day With Water</h3>
            <p>
                Drinking water can be a simple way to begin your morning
                routine.
            </p>

            <h3>Move Regularly</h3>
            <p>
                Add short walks, stretching or other comfortable movement
                throughout your day.
            </p>

            <h3>Take Breaks</h3>
            <p>
                Short breaks can help you reset your attention during long
                periods of work or study.
            </p>

            <h3>Plan Your Day</h3>
            <p>
                Writing down important tasks can make your day feel more
                organized.
            </p>

            <h3>Maintain a Sleep Routine</h3>
            <p>
                Going to bed and waking up at consistent times can support
                a healthy daily routine.
            </p>

            <h3>Stay Consistent</h3>
            <p>
                Small habits become more useful when they are practiced
                consistently over time.
            </p>
        ','src/assets/wellness.png','General','6 min read') ON CONFLICT ("slug") DO NOTHING;
--> statement-breakpoint
INSERT INTO "articles" ("title","slug","description","content","image","category","reading_time") VALUES ('Building a Sustainable Workout Routine','building-a-sustainable-workout-routine','A sustainable workout routine is one that fits comfortably into your lifestyle and can be followed consistently. Set Realistic Goals Start with achievable goals instead of trying t...','
            <p>
                A sustainable workout routine is one that fits comfortably
                into your lifestyle and can be followed consistently.
            </p>

            <h3>Set Realistic Goals</h3>
            <p>
                Start with achievable goals instead of trying to change
                everything at once.
            </p>

            <h3>Create a Schedule</h3>
            <p>
                Choose specific days and times for exercise so that physical
                activity becomes part of your routine.
            </p>

            <h3>Combine Different Activities</h3>
            <p>
                A routine can include strength training, walking,
                cardiovascular exercise, stretching or yoga.
            </p>

            <h3>Increase Gradually</h3>
            <p>
                Increase exercise duration or intensity gradually as your
                fitness improves.
            </p>

            <h3>Allow Recovery</h3>
            <p>
                Rest and recovery are important parts of maintaining a
                sustainable exercise routine.
            </p>

            <h3>Focus on Consistency</h3>
            <p>
                A simple routine that you can follow regularly is often more
                practical than an extremely demanding routine.
            </p>
        ','src/assets/fitness.png','Fitness','8 min read') ON CONFLICT ("slug") DO NOTHING;
--> statement-breakpoint
INSERT INTO "podcasts" ("title","description","thumbnail","audio_url","video_url","category","duration","host","episode_number","listens","published") VALUES ('The Science of a Healthy Mindset','Explore the connection between everyday habits, mindset and overall well-being with Dr. Anjali Mehta.','src/assets/podcast.png','#','/videos/mental_health.mp4','Mental Health','32:00','Dr. Anjali Mehta',1,0,true);
--> statement-breakpoint
INSERT INTO "podcasts" ("title","description","thumbnail","audio_url","video_url","category","duration","host","episode_number","listens","published") VALUES ('The Wellness Way','A Healthora podcast focused on practical wellness and healthy daily habits.','src/assets/podcast.png','#','/videos/fitness.mp4','Lifestyle','28 min','Dr. Anjali Mehta',2,0,true);
--> statement-breakpoint
INSERT INTO "podcasts" ("title","description","thumbnail","audio_url","video_url","category","duration","host","episode_number","listens","published") VALUES ('Mindful Living','A Healthora podcast about mindfulness and mental well-being.','src/assets/meditation.png','#','/videos/mental_health.mp4','Mental Health','30 min','Emma Wilson',3,0,true);
--> statement-breakpoint
INSERT INTO "podcasts" ("title","description","thumbnail","audio_url","video_url","category","duration","host","episode_number","listens","published") VALUES ('Nutrition 101','A Healthora podcast exploring nutrition and healthy food choices.','src/assets/nutrition.png','#','/videos/nutrition.mp4','Nutrition','35 min','Dr. Priya Sharma',4,0,true);
--> statement-breakpoint
INSERT INTO "podcasts" ("title","description","thumbnail","audio_url","video_url","category","duration","host","episode_number","listens","published") VALUES ('Fitness Mindset','A Healthora podcast focused on fitness, exercise and a healthy mindset.','src/assets/fitness.png','#','/videos/fitness.mp4','Fitness','24 min','Rahul Kapoor',5,0,true);
--> statement-breakpoint
INSERT INTO "podcasts" ("title","description","thumbnail","audio_url","video_url","category","duration","host","episode_number","listens","published") VALUES ('Yoga Talks','A Healthora podcast about yoga, movement and everyday wellness.','src/assets/Yoga.png','#','/videos/yoga.mp4','General','26 min','Meera Joshi',6,0,true);
--> statement-breakpoint
INSERT INTO "podcasts" ("title","description","thumbnail","audio_url","video_url","category","duration","host","episode_number","listens","published") VALUES ('Healthy Lifestyle','A Healthora podcast about building healthy and sustainable lifestyle habits.','src/assets/wellness.png','#','/videos/meditation.mp4','Lifestyle','31 min','Dr. Arjun Singh',7,0,true);
